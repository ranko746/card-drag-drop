import clsx from "clsx";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { X, Edit } from "../icons";
import { handleBlurOnEscape } from "../utils/input";

export function Item({ id, label, status, index, action, className }) {
  const [isEditing, setIsEditing] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleSubmitUpdate = (event) => {
    event.preventDefault();
    const { value: label } = event.target.label;
    action.update({ id, label, status });
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided, snapshot) => (
        <div
          className={clsx(
            `flex justify-between p-3 border-4 border-transparent rounded-lg shadow ring-blue-500 focus:outline-none focus:ring-2 w-100 ${!isEditing && 'bg-[#eaf3ff]'}`,
            {
              "ring-2": snapshot.isDragging || isEditing,
            },
            className
          )}
          onClick={() => setCollapsed(state => !state)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <form onSubmit={handleSubmitUpdate}>
              <input
                type="text"
                name="label"
                className="focus:outline-none"
                defaultValue={label}
                onBlur={() => setIsEditing(false)}
                onKeyDown={handleBlurOnEscape}
                autoFocus
                required
              />
            </form>
          ) : collapsed ? (
            <article>
              <h4 className="font-bold text-gray-700">{label}</h4>
              <p className="text-gray-500 font-">Here goes the content of {label}.</p>
            </article>
          ) : (
            label
          )}

          {!isEditing && (
            <div className="flex items-center">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center w-6 h-6 rounded-lg focus:ring-2 focus:outline-none ring-blue-500 "
              >
                <Edit className="w-4 h-4 text-gray-500 opacity-40" />
              </button>
              <button
                onClick={() => action.remove(id)}
                className="flex items-center justify-center w-6 h-6 ml-3 rounded-lg focus:ring-2 focus:outline-none ring-blue-500"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
