import {
  EuiAvatar,
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiHorizontalRule,
  EuiIcon,
  EuiListGroup,
  EuiListGroupItem,
  EuiPopover,
  EuiPortal,
  EuiSelectableMessage,
  EuiSelectableTemplateSitewide,
  EuiShowFor,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import React, { FunctionComponent, useState } from "react";
import { Switch, useHistory } from "react-router-dom";
import "./App.scss";
import { ElasticMark } from "./kui/elastic_mark";
import { orderedCategories, routes } from "./routes";
import { getLinks, RouteWithSubRoutes, _onClick } from "./utils/routing";

const search = (
  <EuiSelectableTemplateSitewide
    options={[]}
    searchProps={{ compressed: true }}
    popoverButton={
      <EuiHeaderSectionItemButton aria-label="Sitewide search">
        <EuiIcon type="search" size="m" />
      </EuiHeaderSectionItemButton>
    }
    popoverButtonBreakpoints={["xs", "s"]}
    popoverProps={{ repositionOnScroll: true }}
    emptyMessage={
      <EuiSelectableMessage style={{ minHeight: 300 }}>
        <p>{"// TODO empty message"}</p>
      </EuiSelectableMessage>
    }
  />
);

function getCategoryLocalStorageKey(id: string) {
  return `core.navGroup.${id}`;
}

function getIsCategoryOpen(id: string, storage: Storage) {
  const value = storage.getItem(getCategoryLocalStorageKey(id)) ?? "true";

  return value === "true";
}

function setIsCategoryOpen(id: string, isOpen: boolean, storage: Storage) {
  storage.setItem(getCategoryLocalStorageKey(id), `${isOpen}`);
}

const App: FunctionComponent = () => {
  const history = useHistory();
  const storage = window.localStorage;
  const [isAlertFlyoutVisible, setIsAlertFlyoutVisible] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [isSpacesMenuVisible, setIsSpacesMenuVisible] = useState(false);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem("navIsDocked"))) ?? false
  );

  const links = getLinks(history, setNavIsOpen);

  return (
    <>
      <EuiHeader
        theme="dark"
        position="fixed"
        sections={[
          {
            items: [
              <EuiHeaderLogo aria-label="Elastic">
                <ElasticMark />
              </EuiHeaderLogo>,
            ],
            borders: "none",
          },
          {
            items: [<EuiShowFor sizes={["m", "l", "xl"]}>{search}</EuiShowFor>],
            borders: "none",
          },
          {
            items: [
              <EuiShowFor sizes={["xs", "s"]}>{search}</EuiShowFor>,
              <EuiHeaderSectionItemButton
                notification={true}
                aria-label="Notifications: Updates available"
                onClick={() => setIsAlertFlyoutVisible(!isAlertFlyoutVisible)}
              >
                <EuiIcon type="cheer" size="m" />
              </EuiHeaderSectionItemButton>,
              <EuiPopover
                id="guideHeaderUserMenuExample"
                ownFocus
                repositionOnScroll
                button={
                  <EuiHeaderSectionItemButton
                    aria-controls="guideHeaderUserMenuExample"
                    aria-expanded={isUserMenuVisible}
                    aria-haspopup="true"
                    aria-label="User menu"
                    onClick={() => setIsUserMenuVisible(!isUserMenuVisible)}
                  >
                    <EuiAvatar name="John Username" size="s" />
                  </EuiHeaderSectionItemButton>
                }
                isOpen={isUserMenuVisible}
                anchorPosition="downRight"
                closePopover={() => setIsUserMenuVisible(false)}
              >
                <div style={{ width: 320 }}>
                  <EuiText size="s" color="subdued">
                    <p>{"// TODO user menu"}</p>
                  </EuiText>
                </div>
              </EuiPopover>,
            ],
            borders: "none",
          },
        ]}
      />
      <EuiHeader
        position="fixed"
        sections={[
          {
            items: [
              <EuiCollapsibleNav
                id="guideHeaderCollapsibleNavExample"
                aria-label="Main navigation"
                isOpen={navIsOpen}
                isDocked={navIsDocked}
                button={
                  <EuiHeaderSectionItemButton
                    aria-label="Toggle main navigation"
                    onClick={() => setNavIsOpen(!navIsOpen)}
                  >
                    <EuiIcon type={"menu"} size="m" aria-hidden="true" />
                  </EuiHeaderSectionItemButton>
                }
                onClose={() => setNavIsOpen(false)}
              >
                <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
                  <EuiCollapsibleNavGroup
                    background="light"
                    className="eui-yScroll"
                    style={{ maxHeight: "40vh" }}
                  >
                    <EuiListGroup
                      aria-label="Pinned links"
                      listItems={[
                        {
                          label: "Home",
                          iconType: "home",
                          href: history.createHref({ pathname: "" }),
                          onClick: (event) => {
                            setNavIsOpen(false);
                            _onClick("", history)(event);
                          },
                        },
                      ]}
                      maxWidth="none"
                      color="text"
                      gutterSize="none"
                      size="s"
                    />
                  </EuiCollapsibleNavGroup>
                </EuiFlexItem>
                <EuiHorizontalRule margin="none" />
                <EuiFlexItem className="eui-yScroll">
                  {orderedCategories.map(({ id, icon, label }) => {
                    return (
                      <EuiCollapsibleNavGroup
                        key={id}
                        iconType={icon}
                        title={label}
                        isCollapsible={true}
                        initialIsOpen={getIsCategoryOpen(id, storage)}
                        onToggle={(isCategoryOpen) =>
                          setIsCategoryOpen(id, isCategoryOpen, storage)
                        }
                      >
                        <EuiListGroup
                          aria-label={`Primary navigation links, ${label}`}
                          listItems={links[id]}
                          maxWidth="none"
                          color="subdued"
                          gutterSize="none"
                          size="s"
                        />
                      </EuiCollapsibleNavGroup>
                    );
                  })}
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  {/* Docking button only for larger screens that can support it*/}
                  <EuiShowFor sizes={["l", "xl"]}>
                    <EuiCollapsibleNavGroup>
                      <EuiListGroupItem
                        size="xs"
                        color="subdued"
                        label={`${navIsDocked ? "Undock" : "Dock"} navigation`}
                        onClick={() => {
                          setNavIsDocked(!navIsDocked);
                          localStorage.setItem(
                            "navIsDocked",
                            JSON.stringify(!navIsDocked)
                          );
                        }}
                        iconType={navIsDocked ? "lock" : "lockOpen"}
                      />
                    </EuiCollapsibleNavGroup>
                  </EuiShowFor>
                </EuiFlexItem>
              </EuiCollapsibleNav>,
              <EuiPopover
                id="guideHeaderSpacesMenuExample"
                ownFocus
                repositionOnScroll
                button={
                  <EuiHeaderSectionItemButton
                    aria-controls="guideHeaderSpacesMenuExample"
                    aria-expanded={isSpacesMenuVisible}
                    aria-haspopup="true"
                    aria-label="Spaces menu"
                    onClick={() => setIsSpacesMenuVisible(!isSpacesMenuVisible)}
                  >
                    <EuiAvatar type="space" name="Default Space" size="s" />
                  </EuiHeaderSectionItemButton>
                }
                isOpen={isSpacesMenuVisible}
                anchorPosition="downRight"
                closePopover={() => setIsSpacesMenuVisible(false)}
              >
                <div style={{ width: 320 }}>
                  <EuiText size="s" color="subdued">
                    <p>{"// TODO spaces"}</p>
                  </EuiText>
                </div>
              </EuiPopover>,
            ],
          },
        ]}
      />
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
      {isAlertFlyoutVisible && (
        <EuiPortal>
          <EuiFlyout
            onClose={() => setIsAlertFlyoutVisible(false)}
            size="s"
            id="guideHeaderAlertExample"
            aria-labelledby="guideHeaderAlertExampleTitle"
          >
            <EuiFlyoutHeader hasBorder>
              <EuiTitle size="s">
                <h2 id="guideHeaderAlertExampleTitle">EuiHeaderAlert</h2>
              </EuiTitle>
            </EuiFlyoutHeader>
            <EuiFlyoutBody>
              <EuiText size="s" color="subdued">
                <p>{"// TODO alerts flyout"}</p>
              </EuiText>
            </EuiFlyoutBody>
          </EuiFlyout>
        </EuiPortal>
      )}
    </>
  );
};

export default App;
