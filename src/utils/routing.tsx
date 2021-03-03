import { Route, useHistory } from "react-router-dom";
import { routes } from "../routes";

type History = ReturnType<typeof useHistory>;
type MyMouseEvent = React.MouseEvent<HTMLElement, MouseEvent>;

const isModifiedEvent = (event: MyMouseEvent) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const isLeftClickEvent = (event: MyMouseEvent) => event.button === 0;

const isTargetBlank = (event: MyMouseEvent) => {
  const target = (event.target as HTMLElement).getAttribute("target");
  return target && target !== "_self";
};

export function _onClick(to: string, history: History) {
  return function (event: MyMouseEvent) {
    if (
      event.defaultPrevented ||
      isModifiedEvent(event) ||
      !isLeftClickEvent(event) ||
      isTargetBlank(event)
    ) {
      return;
    }

    event.preventDefault(); // Prevent regular link behavior, which causes a browser refresh.
    history.push(to); // Push the route to the history.
  };
}

export function getLinks(history: History, setNavIsOpen: Function) {
  return routes.reduce(
    (
      categorizedLinks: {
        [key: string]: Array<{
          label: string;
          href: string;
          onClick: ReturnType<typeof _onClick>;
        }>;
      },
      link
    ) => {
      const { category, path, label } = link;

      if (!category || !label) return categorizedLinks;
      if (!Array.isArray(categorizedLinks[category]))
        categorizedLinks[category] = [];

      categorizedLinks[category].push({
        label,
        href: history.createHref({ pathname: path }),
        onClick: (event: MyMouseEvent) => {
          setNavIsOpen(false);
          _onClick(path, history)(event);
        },
      });

      return categorizedLinks;
    },
    {}
  );
}

export function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
