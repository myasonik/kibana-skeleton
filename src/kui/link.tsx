import { EuiLink, EuiLinkButtonProps } from "@elastic/eui";
import React from "react";
import { useHistory } from "react-router";
import { _onClick } from "../utils/routing";

export default function EuiCustomLink({
  to,
  ...rest
}: { to: string } & EuiLinkButtonProps) {
  const history = useHistory();

  // Generate the correct link href (with basename accounted for)
  const href = history.createHref({ pathname: to });
  const onClick = _onClick(to, history);
  const props = { ...rest, href, onClick };

  // @ts-ignore-next-line
  return <EuiLink {...props} />;
}
