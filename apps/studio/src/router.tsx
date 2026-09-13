import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { RootLayout } from "@/routes/root";
import { PreviewRoute } from "@/routes/preview";
import { EditorRoute } from "@/routes/editor";

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/preview" });
  },
});

const previewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/preview",
  component: PreviewRoute,
  validateSearch: (search: Record<string, unknown>): { template?: string } => ({
    template: typeof search.template === "string" ? search.template : undefined,
  }),
});

const editorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/editor",
  component: EditorRoute,
  validateSearch: (
    search: Record<string, unknown>,
  ): { doc?: string; preset?: string } => ({
    doc: typeof search.doc === "string" ? search.doc : undefined,
    preset: typeof search.preset === "string" ? search.preset : undefined,
  }),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  previewRoute,
  editorRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
