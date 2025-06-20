import { Handle } from "@xyflow/react";
import { Check, ChevronDown, ChevronRight } from "lucide-react";

export default function CustomNode({ data }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md w-36">
      <div
        className={`${
          data.read ? "bg-blue-700" : "bg-gray-200"
        } flex justify-between items-center px-2 py-1`}
      >
        <button
          onClick={data.onCheck}
          className={`${
            data.read ? "bg-blue-500" : "bg-gray-400"
          } cursor-pointer h-4 w-4 rounded-full flex justify-center items-center`}
        >
          {data.read && <Check size={12} color="white" />}
        </button>

        {data.hasChildren && (
          <button onClick={data.onToggle} className="cursor-pointer">
            {data.opened ? (
              <ChevronDown size={12} color="black" />
            ) : (
              <ChevronRight size={12} color="black" />
            )}
          </button>
        )}
      </div>

      <div
        className={`${
          data.read ? "bg-blue-100" : "bg-white"
        } text-center text-sm py-4 px-2 text-blue-800 font-medium`}
      >
        {data.label}
      </div>

      <Handle id="a" type="target" position="left" style={{ visibility: "hidden" }} />
      <Handle id="b" type="source" position="right" style={{ visibility: "hidden" }} />
    </div>
  );
}
