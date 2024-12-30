export const getDragAfterElement = (container: HTMLDivElement, y: number) => {
  const draggableElements = [
    ...container.querySelectorAll(".draggable-item:not(.dragging)"),
  ];

  const el = draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return { offset: 0, element: closest };
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  );

  // @ts-expect-error investigate this
  return el.element;
};
