const placeContentToTheRight = (type: "init" | "reset" | "update") => {
  const articleContainer = document.getElementById("page-container");
  if (!articleContainer) return;
  if (type === "init") {
    const articleContainerWidth = articleContainer.offsetWidth;
    const windowWidth = window.innerWidth;
    const whitespace = windowWidth - articleContainerWidth;
    const marginRight = whitespace / 4;
    const articleContainerLeft = whitespace / 2 - marginRight;
    articleContainer.style.left = `${articleContainerLeft}px`;
  } else if (type === "reset") {
    articleContainer.style.left = `0px`;
  }
};

const displaySection = (id: number) => {
  const section = document.getElementById(`section-${id}`);
  if (!section) return;
  // remove hidden class
  section.classList.remove("hidden");
};

export { placeContentToTheRight, displaySection };
