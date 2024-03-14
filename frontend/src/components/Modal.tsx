import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  title: string | null;
  children: React.ReactNode; // for the main content of the modal
  footerContent?: React.ReactNode; // optional footer content (like buttons)
  style: string;
  modalsize: string;
  isNotRound: boolean;
  canScroll: boolean;
  MarginTop : string;
};

export default function Modal({
  isOpen,
  closeModal,
  title,
  children,
  footerContent,
  style,
  modalsize,
  isNotRound,
  canScroll,
  MarginTop
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={()=>null}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className={"fixed inset-0 overflow-y-auto"}>
          <div className={!style ? "flex min-h-full items-center justify-center p-4 text-center" : style}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full max-w-md transform ${canScroll ? "overflow-y-scroll" : "overflow-hidden"} ${isNotRound ? '': 'rounded-2xl'} bg-white p-6 text-left align-middle shadow-xl transition-all ${modalsize ? modalsize : null}`}>
                {title ? <Dialog.Title
                  as="h1"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title> : null}
                <div className={`mt-2 ${MarginTop}`}>{children}</div>

                {footerContent && <div className="mt-4">{footerContent}</div>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
