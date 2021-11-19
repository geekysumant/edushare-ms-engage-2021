import { Tab } from "@headlessui/react";
import QuizBanner from "./UI/QuizBanner";
import AssignmentBanner from "./UI/AssignmentBanner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TabComponent = ({ categories, userInfo, createdBy }) => {
  console.log(categories);
  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category._id}
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((quizzes, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "bg-white rounded-xl p-3",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
              )}
            >
              {quizzes.length === 0 && <p>Oops no quiz found</p>}
              {quizzes.map((quiz) => (
                <div className="flex flex-col items-center ">
                  {idx === 0 ? (
                    <QuizBanner
                      questions={quiz.questions}
                      quizId={quiz._id}
                      userInfo={userInfo}
                      createdBy={createdBy}
                    />
                  ) : (
                    <AssignmentBanner
                      title={quiz.title}
                      marks={quiz.marks}
                      assignmentId={quiz._id}
                    />
                  )}
                </div>
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabComponent;
