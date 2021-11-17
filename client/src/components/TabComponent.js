import { useState } from "react";
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
              {/* <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative p-3 rounded-md hover:bg-coolGray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        "absolute inset-0 rounded-md",
                        "focus:z-10 focus:outline-none focus:ring-2 ring-blue-400"
                      )}
                    />
                  </li>
                ))}
              </ul> */}

              {/* {quizzes && */}
              {quizzes.map((quiz) => (
                <>
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
                </>
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabComponent;
