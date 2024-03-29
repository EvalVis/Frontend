import { expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";

test("Shows main page with posts", async () => {
    global.fetch = vi.fn().mockImplementation(
        (_, __) => Promise.resolve(
            {
                ok: true,
                json: () => Promise.resolve([
                    { title: "t1", authorName: "a1" },
                    { title: "t2", authorName: "a2" }
                ])
            }
        )
    );
    vi.mock("next-auth/react", () => {
        return {
            useSession: vi.fn(
                () => {
                    return { data: { user: { username: "admin" } }, status: 'authenticated' };
                }
            )
        };
    });
    vi.mock("react-redux", () => {
        return {
          useSelector: vi.fn(
            (_) => {
              return "tester";
            }
          )
        };
      });
    render(<Page />);
    expect(screen.getByText("Create a new post")).toBeDefined();
    expect(screen.getByText("Articles")).toBeDefined();
    await waitFor(async () => {
        expect(screen.getByText("t1")).toBeDefined();
        expect(screen.getByText("a1")).toBeDefined();
        expect(screen.getByText("t2")).toBeDefined();
        expect(screen.getByText("a2")).toBeDefined();
    });
});