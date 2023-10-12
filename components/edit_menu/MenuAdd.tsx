import Form from './Form';

interface Props {
  refresh: () => void;
}

export default function Add({ refresh }: Props) {
  return (
    <div>
      <button
        className="btn w-full mt-5"
        onClick={() => {
          if (document) {
            (
              document.getElementById('my_modal') as HTMLFormElement
            ).showModal();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
          />
        </svg>
      </button>
      <dialog id="my_modal" className="modal">
        <div className="modal-box h-[500px]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <Form refresh={refresh} />
        </div>
      </dialog>
    </div>
  );
}
