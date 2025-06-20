import { useCallback, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "./ui/CustomNode";
import { baseNodes } from "../../data";
import { SidebarDemo } from "../components/Sidebar";

const HORIZONTAL_GAP = 180;
const VERTICAL_GAP = 100;

function layoutChildrenRecursive(parentNode, children, expandedMap, depth = 1) {
  const positioned = [];
  const parentX = parentNode?.position?.x ?? 0;
  const parentY = parentNode?.position?.y ?? 0;

  const totalHeight = (children.length - 1) * VERTICAL_GAP;
  const startY = parentY - totalHeight / 2;

  children.forEach((child, index) => {
    const posY = startY + index * VERTICAL_GAP;
    const posX = parentX + HORIZONTAL_GAP * depth;

    if (!child.position) {
      child.position = { x: posX, y: posY };
    }

    const positionedChild = {
      ...child,
      type: "textUpdater",
      position: { x: posX, y: posY },
    };

    positioned.push(positionedChild);

    if (child.children && expandedMap[child.id]) {
      const grandChildren = layoutChildrenRecursive(
        positionedChild,
        child.children,
        expandedMap,
        depth + 1
      );
      positioned.push(...grandChildren);
    }
  });

  return positioned;
}

const nodeTypes = { textUpdater: CustomNode };

export default function StudyPlan() {
  const [nodes, setNodes] = useState([
    {
      ...baseNodes[0],
      type: "textUpdater",
      position: { x: 50, y: 200 },
    },
  ]);
  const [edges, setEdges] = useState([]);
  const [expanded, setExpanded] = useState({});

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  function findNodeById(nodes, id) {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  function getAllDescendantIds(node) {
    let ids = [];
    if (node.children) {
      for (const child of node.children) {
        ids.push(child.id);
        ids = ids.concat(getAllDescendantIds(child));
      }
    }
    return ids;
  }

  const toggleNode = (nodeId) => {
    setExpanded((prev) => {
      const isExpanded = !!prev[nodeId];
      const updated = { ...prev, [nodeId]: !isExpanded };
      const parent =
        nodes.find((n) => n.id === nodeId) || findNodeById(baseNodes, nodeId);

      if (!isExpanded && parent?.children) {
        const positioned = layoutChildrenRecursive(
          parent,
          parent.children,
          updated
        );
        setNodes((nds) => {
          const existingIds = new Set(nds.map((n) => n.id));
          const newNodes = positioned.filter((n) => !existingIds.has(n.id));
          return [...nds, ...newNodes];
        });

        setEdges((eds) => {
          const existingEdgeIds = new Set(eds.map((e) => e.id));
          const newEdges = parent.children
            .map((child) => ({
              id: `edge-${nodeId}-${child.id}`,
              source: nodeId,
              target: child.id,
              sourceHandle: "b",
            }))
            .filter((e) => !existingEdgeIds.has(e.id));
          return [...eds, ...newEdges];
        });
      } else if (isExpanded) {
        const descendantIds = getAllDescendantIds(parent);
        setNodes((nds) => nds.filter((n) => !descendantIds.includes(n.id)));
        setEdges((eds) => eds.filter((e) => !descendantIds.includes(e.target)));
        descendantIds.forEach((id) => {
          delete updated[id];
        });
      }

      return updated;
    });
  };

  const enhancedNodes = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onToggle: () => toggleNode(node.id),
      hasChildren: !!findNodeById(baseNodes, node.id)?.children,
      opened: !!expanded[node.id],
      read: node.data.completed,
      label: node.title,
      onCheck: () => {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === node.id
              ? { ...n, data: { ...n.data, completed: !n.data.completed } }
              : n
          )
        );
      },
    },
  }));

  return (
    <div className="h-screen flex">
      <SidebarDemo />
      <ReactFlowProvider>
        <ReactFlow
          nodes={enhancedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        />
        <Background />
      </ReactFlowProvider>
    </div>
  );
}
