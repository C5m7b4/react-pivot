import {
  render,
  act,
  screen,
  fireEvent,
  createEvent,
} from "@testing-library/react";
import Configurator from "../../components/pivotTable/Configurator";
import { vi } from "vitest";
import { data } from "../../data";
import "@testing-library/jest-dom";
import { page, userEvent } from "@vitest/browser/context";
import { dragAndDrop } from "../helpers";

// const createBubbledEvent = (type, props = {}) => {
//   const event = new Event(type, { bubbles: true });
//   Object.assign(event, props);
//   return event;
// };

describe("Rows", () => {
  it("should render properly", async () => {
    vi.useFakeTimers();
    await act(async () => {
      render(
        <Configurator
          data={data}
          rows={[]}
          setRows={vi.fn()}
          values={[]}
          setValues={vi.fn()}
          filters={[]}
          setFilters={vi.fn()}
          columns={[]}
          setColumns={vi.fn()}
        />
      );
    });

    const field = await screen.getByTestId("field-5");
    const rows = await screen.getByTestId("filtered-rows");
    const dragStartEvent = createEvent.dragStart(field);
    const dragOverEvent = createEvent.dragOver(rows);
    const dropEvent = createEvent.drop(rows);

    Object.defineProperty(dragStartEvent, "dataTransfer", {
      value: {
        setData: vi.fn(),
      },
    });
    Object.defineProperty(dragOverEvent, "dataTransfer", {
      value: { dropEffect: "move" },
    });
    Object.defineProperty(dropEvent, "dataTransfer", {
      value: { getData: vi.fn(() => "company") },
    });

    await act(async () => {
      fireEvent(field, dragStartEvent);
      fireEvent(rows, dragOverEvent);
      fireEvent(rows, dropEvent);
    });

    vi.advanceTimersByTime(2000);
    screen.debug();
  });
  it.skip("should render", async () => {
    // vi.useFakeTimers();

    await act(async () => {
      render(
        <Configurator
          data={data}
          rows={[]}
          setRows={vi.fn()}
          values={[]}
          setValues={vi.fn()}
          filters={[]}
          setFilters={vi.fn()}
          columns={[]}
          setColumns={vi.fn()}
        />
      );
    });

    const fields = screen.getByTestId("fields");
    expect(fields).toBeInTheDocument();
    const field = await page.getByTestId("field-5");
    // const field = fields.querySelector(
    //   '[query-id="query-field-5"]>label'
    // ) as HTMLDivElement;

    //expect(field?.textContent).toBe("company");
    const rows = page.getByTestId("filtered-rows");

    const sourceBox = field.boundingBox();

    // await act(async () => {
    //   await fireEvent.dragStart(field, {
    //     dataTransfer: { setData: vi.fn() },
    //   });

    //   await fireEvent.dragOver(rows, {
    //     dataTransfer: { dropEffect: "move" },
    //   });

    //   await fireEvent.drop(rows, {
    //     dataTransfer: { getData: vi.fn(() => "commpany") },
    //   });
    // });

    //await userEvent.dragAndDrop(field, rows);
    //await field.dropTo(rows);

    // act(() => {
    //   vi.advanceTimersByTime(2000);
    // });

    //console.log("rows children", rows.children.length);

    // const fieldRec = field?.getBoundingClientRect();
    // console.log("fieldRec", fieldRec);
    // const initialX = fieldRec?.left;
    // const initialY = fieldRec?.top;

    // const rowRec = rows.getBoundingClientRect();
    // console.log("rowRec.left", rowRec.left, "rowRec.top", rowRec.top);

    // await fireEvent.mouseDown(field, { clientX: 0, clientY: 0 });
    // await fireEvent.mouseMove(field, {
    //   clientX: rowRec.left + 10,
    //   clientY: rowRec.top + 10,
    // });
    // await fireEvent.mouseUp(field);

    // const newX = field?.style.left;
    // const newY = field?.style.top;
    // console.log("newX", newX, "newY", newY);
    // expect(newX).not.toBe(initialX);
    // expect(newY).not.toBe(initialY);

    // field.dispatchEvent(
    //   createBubbledEvent("dragstart", { clientX: 0, clientY: 0 })
    // );
    // rows.dispatchEvent(createBubbledEvent("drop", { clientX: 0, clientY: 1 }));

    screen.debug();
  });
});
