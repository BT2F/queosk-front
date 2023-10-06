export default function RatingCard() {
  return (
    <div className="card w-1/2 h-[200px] bg-base-100 shadow-xl flex flex-col mb-10 mx-0">
      <h1 className="text-xl font-bold absolute top-5 left-5">평점</h1>
      <div className="w-full absolute top-12 flex justify-around items-center ">
        <div className="w-full flex flex-row items-center justify-evenly">
          <h3 className="text-5xl font-bold mb-3">3.6</h3>
          <div className="w-3/5 flex">
            <div className="w-1/12 text-gray-400">
              <p>5</p>
              <p>4</p>
              <p>3</p>
              <p>2</p>
              <p>1</p>
            </div>
            <div className="w-11/12">
              <progress
                className="progress progress-warning"
                value={0}
                max="100"
              ></progress>
              <progress
                className="progress progress-warning "
                value="10"
                max="100"
              ></progress>
              <progress
                className="progress progress-warning "
                value="40"
                max="100"
              ></progress>
              <progress
                className="progress progress-warning "
                value="70"
                max="100"
              ></progress>
              <progress
                className="progress progress-warning"
                value="100"
                max="100"
              ></progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
