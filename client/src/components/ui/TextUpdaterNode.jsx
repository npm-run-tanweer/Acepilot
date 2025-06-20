import { Handle } from '@xyflow/react';
 
export default function CustomNode() {
  return (
    <div className="">
      <div>Custom Node Content</div>
      <Handle type="source" position="top" />
      <Handle type="target" position="bottom" />
    </div>
  );
}