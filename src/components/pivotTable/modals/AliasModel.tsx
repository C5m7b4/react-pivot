import ReactDOM from "react-dom";
import { useClickOutside } from "../hooks/useClickOutside";

interface AliasModalProps {
  isShowing: boolean;
  hide: () => void;
  title: string;
  column: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  confirm: () => void;
}

const AliasModal = ({
  isShowing,
  hide,
  title,
  column,
  value,
  onChange,
  confirm,
}: AliasModalProps) => {
  const ref = useClickOutside<HTMLDivElement>(() => {
    console.log("click outside");
    hide();
  });

  return isShowing
    ? ReactDOM.createPortal(
        <div>
          <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 opacity-80 transition-all duration-500" />
          <div
            className="fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto flex justify-center items-center z-50"
            aria-modal
            tabIndex={-1}
            role="dialog"
          >
            <div ref={ref} className="bg-white w-1/3 rounded-lg shadow-lg">
              <div className="border-b-2 flex justify-between items-center px-2 py-1">
                <span className="font-medium">{title}</span>
                <span>
                  <button
                    type="button"
                    className="border px-2 rounded-md shadow-sm bg-white hover:bg-slate-200 transition-all duration-500"
                    data-dismiss="modal"
                    onClick={hide}
                  >
                    <span aria-hidden="true">X</span>
                  </button>
                </span>
              </div>
              <div className="p-4">
                <div>
                  Set an alias for "
                  <span className="font-medium">{column}</span>"
                  <input
                    className="w-full rounded-lg shadow-sm pl-2 pr-8 border mb-2 
                            focus:ring-1 outline-none ring-blue-300"
                    value={value}
                    onChange={onChange}
                  />
                </div>
                <div className="flex mt-2 border-t justify-between gap-4 px-6">
                  <div
                    className="border my-2 py-1 px-12 rounded-lg shadow-md cursor-pointer hover:bg-slate-200 transition-all duration-500"
                    onClick={hide}
                  >
                    Cancel
                  </div>
                  <div
                    className="border my-2 py-1 px-12 rounded-lg shadow-md cursor-pointer hover:bg-slate-200 transition-all duration-500"
                    onClick={confirm}
                  >
                    OK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default AliasModal;
