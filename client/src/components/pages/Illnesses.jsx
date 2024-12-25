import React from "react";

const Illnesses = () => {
  return (
    <main>
      <section>
        <form className="flex justify-between">
          <div className="w-[60%] ">
            <input
              type="text"
              placeholder="name of illness"
              name="illness"
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
            />
            <textarea
              name="description"
              placeholder="discribtion"
              className="w-full resize-none outline-none px-4 py-2 rounded-md mt-4 "
              rows={7}
            />
            <div>
              <button className="px-[4rem] py-2 bg-darkWood text-white rounded-md mt-5 ">
                submit
              </button>
            </div>
          </div>
          <div className="w-[30%] ">
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                className="px-4 py-2 outline-none rounded-md"
                placeholder="medicine"
              />
              <input
                type="text"
                className="px-4 py-2 outline-none rounded-md"
                placeholder="medicine"
              />
              <input
                type="text"
                className="px-4 py-2 outline-none rounded-md"
                placeholder="medicine"
              />
              <input
                type="text"
                className="px-4 py-2 outline-none rounded-md"
                placeholder="medicine"
              />
              <input
                type="text"
                className="px-4 py-2 outline-none rounded-md"
                placeholder="medicine"
              />
              <input
                type="text"
                className="px-4 py-2 outline-none rounded-md"
                placeholder="medicine"
              />
            </div>
          </div>
        </form>
      </section>
      <section></section>
    </main>
  );
};

export default Illnesses;
