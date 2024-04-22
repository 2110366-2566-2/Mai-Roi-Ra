import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string | null;
  closeModal: () => void;
  children?: React.ReactNode;
};

export default function ResponseReviewModal({
  isOpen,
  closeModal,
  title,
  children,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => null}>
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

        <div className={"fixed inset-0 overflow-y-auto"} onClick={closeModal}>
          <div
            className={
              "flex min-h-full items-center justify-center p-4 text-center"
            }
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-md transform ${"overflow-hidden"} ${"rounded-2xl"} bg-white p-6 text-left align-middle shadow-xl transition-all 
                }`}
              >
                {title ? (
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-bold leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                ) : null}
                <div className={`mt-2`}>{children}</div>

                {/* {footerContent && <div className="mt-4">{footerContent}</div>}  */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
