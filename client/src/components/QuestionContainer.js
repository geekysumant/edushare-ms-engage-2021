import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

export default function QuestionContainer({
  questionBody,
  options,
  correctOption,
  correctMarks,
  incorrectMarks,
}) {
  return (
    <div className="w-full px-4 mb-2">
      <div className="w-full max-w-2xl p-2 mx-auto bg-white rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span className="font-bold">Question:</span>
                <span className="flex justify-between w-full">
                  <span className="mx-4 text-base font-normal">
                    {questionBody}
                  </span>
                </span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 flex flex-row justify-between">
                <div>
                  <h4 className="font-bold">Options:</h4>

                  {options.length > 0 &&
                    options.map((option) => (
                      <p key={option.optionNumber}>
                        {option.optionNumber}. {option.option}
                      </p>
                    ))}

                  <p className="font-bold">
                    Correct Option: {options[correctOption - 1].optionNumber}
                    {". "}
                    {options[correctOption - 1].option}
                  </p>
                </div>
                <div>
                  <span className="text-lg text-green-500">
                    +{correctMarks}
                  </span>
                  <span className="text-lg ">{" / "}</span>
                  <span className="text-lg text-red-500">{incorrectMarks}</span>
                  {/* <p>Correct answer: {correctMarks}</p>
                  <p>Inorrect answer: {incorrectMarks}</p> */}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
