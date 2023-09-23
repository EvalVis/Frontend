import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Page from "./page";

test("Post form submits correct data",
  async () => {
    const postId = 1;
    const postTitle = "title";
    const postContent = "content";
    global.fetch = vi.fn().mockImplementation(
      (_, { body }) => {
        const parsedBody = JSON.parse(body);
        expect(parsedBody).toMatchSnapshot();
        return Promise.resolve({json: () => Promise.resolve({ ...parsedBody, id: postId })});
      }
    );
    vi.mock('next/navigation', () => ({
      useRouter() {
        return {
          push: (path) => {expect(path).toMatchSnapshot()}
        };
      },
    }));
    render(<Page />);

    await userEvent.type(screen.getByLabelText("Post title"), postTitle);
    await userEvent.type(screen.getByLabelText("Post content"), postContent);
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));
  }
);