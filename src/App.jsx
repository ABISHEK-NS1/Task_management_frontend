import { useRef, useState } from "react";
import AddProjects from "./components/AddProjects";
import SideBar from "./components/SideBar";
import CreateNew from "./components/CreateNew";
import SubTasks from "./components/SubTasks";

function App() {
  //const [displayIt, setDisplayIt] = useState(false);
  //const [tasks, setTasks] = useState([]);
  const [projectInfo, setProjectInfo] = useState({
    projectIdSelected: undefined,
    projects: [],
  });
  const [descriptionOfSub, setDescriptionOfSub] = useState({});
  /*function toggleDisplay() {
    setDisplayIt(true);
  }*/
  function displaySubTask(id) {
    setProjectInfo((prev) => ({
      ...prev,
      projectIdSelected: id,
    }));
  }
  /*function updateTask(title, description, dueDate) {
    setTasks((prev) => [
      ...prev,
      { title: title, description: description, due: dueDate },
    ]);
  }*/
  function toggleDisplay() {
    setProjectInfo((prev) => ({
      ...prev,
      projectIdSelected: null,
    }));
  }
  function updateTask(title, description, dueDate) {
    setProjectInfo((prev) => ({
      ...prev,
      projectIdSelected: undefined,
      projects: [
        ...prev.projects,
        {
          id: prev.projects.length + 1,
          title: title,
          description: description,
          due: dueDate,
        },
      ],
    }));
  }
  function deleteTask(id) {
    setProjectInfo((prev) => ({
      ...prev,
      projects: prev.projects.filter((pro) => pro.id !== id),
      projectIdSelected: undefined,
    }));
    setDescriptionOfSub((prev) => {
      const tempDict = Object.fromEntries(
        Object.entries(prev).filter(
          ([key]) => key != projectInfo.projectIdSelected
        )
      );
      return tempDict; //Note: here dont wrap as return { tempDict } becuase if we wrap like that it becomes as { tempDict : {}} which is not intended in this case
    });
  }
  function cancelTaskCreation() {
    setProjectInfo((prev) => ({
      ...prev,
      projectIdSelected: undefined,
    }));
  }
  /*function deleteTask(title) {
    setTasks(tasks.filter((task) => task.title !== title));
    setDisplayIt(true);
  }*/
  function updateSubTasks(subTaskInfo) {
    setDescriptionOfSub((prev) => ({
      ...prev,
      [projectInfo.projectIdSelected]: prev[projectInfo.projectIdSelected]
        ? [...prev[projectInfo.projectIdSelected], subTaskInfo]
        : [subTaskInfo],
    }));
  }
  function handleDeleteSubTask(index) {
    setDescriptionOfSub((prev) => ({
      ...prev,
      [projectInfo.projectIdSelected]: prev[
        projectInfo.projectIdSelected
      ].filter((_, ind) => ind !== index),
    }));
  }
  let content;
  if (projectInfo.projectIdSelected === undefined) {
    content = <CreateNew display={toggleDisplay} />;
  } else if (projectInfo.projectIdSelected === null) {
    content = (
      <AddProjects handleUpdate={updateTask} cancel={cancelTaskCreation} />
    );
  } else if (
    projectInfo.projectIdSelected != undefined &&
    projectInfo.projectIdSelected != null
  ) {
    let index = projectInfo.projects.findIndex(
      (pro) => pro.id === projectInfo.projectIdSelected
    );
    content = (
      <SubTasks
        id={projectInfo.projects[index]?.id}
        title={projectInfo.projects[index]?.title}
        due={projectInfo.projects[index]?.due}
        description={projectInfo.projects[index]?.description}
        descriptionSub={descriptionOfSub}
        displayAddNew={toggleDisplay}
        deleteTsk={deleteTask}
        handleDeleteSubTask={handleDeleteSubTask}
        updateSubTasks={updateSubTasks}
      />
    );
  }
  return (
    <div className="flex h-screen max-h-screen">
      <SideBar
        display={toggleDisplay}
        //displayTasks={tasks}
        displayTasks={projectInfo.projects}
        subTaskDisplay={displaySubTask}
      />
      {/*{displayIt === true ? (
        <AddProjects handleUpdate={updateTask} />
      ) : tasks.length > 0 ? (
        <SubTasks
          title={tasks[subTaskTitle]?.title}
          due={tasks[subTaskTitle]?.due}
          description={tasks[subTaskTitle]?.description}
          displayAddNew={toggleDisplay}
          deleteTsk={deleteTask}
        />
      ) : (
        <CreateNew display={toggleDisplay} />
      )}*/}
      {content}
    </div>
  );
}

export default App;
