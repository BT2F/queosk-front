import AddForm from './AddForm';

interface Props {
  refresh: () => void;
}

export default function TableAdd({ refresh }: Props) {
  return (
    <div>
      <button
        className="btn w-[120px] bg-blue-300"
        onClick={() => {
          if (document) {
            (
              document.getElementById('TableAdd_Modal') as HTMLFormElement
            ).showModal();
          }
        }}
      >
        테이블 추가
      </button>
      <dialog id="TableAdd_Modal" className="modal">
        <div className="modal-box h-[200px]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <AddForm refresh={refresh} />
        </div>
      </dialog>
    </div>
  );
}
