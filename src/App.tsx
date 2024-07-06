
import * as React from "react"

import {
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavDrawerProps,
  NavItem,
  NavSectionHeader,
} from "@fluentui/react-nav-preview"

import {
  Button,
  Tooltip,
  makeStyles,
  tokens,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@fluentui/react-components"

import {
  Home32Regular,
  Home32Filled,
  LeafTwo32Regular,
  LeafTwo32Filled,
  ArrowExportLtrFilled,
  ArrowExportRtlFilled,
  ArrowHookDownLeft28Filled,
  bundleIcon,
} from "@fluentui/react-icons"

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "600px",
  },

  content: {
    flex: "1",

    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  button: {
    border: "none", // 移除边框
    marginTop: "10px",
    marginLeft: "5px",
    borderRadius: "5px",
    backgroundColor: "#ebf3fc", // 按钮背景颜色为蓝色,
    color: tokens.colorNeutralForeground1,
    '&:hover': {
      backgroundColor: "lightblue", // 悬停时的背景颜色
    },

  },

  field: {
    display: "flex",

    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },

  navItemText: {
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    paddingTop: "4px",
  },
  navDrawer: {

    borderBottomRightRadius: "50px", // 圆角半径
    overflow: "hidden", // 确保子元素不溢出圆角区域
  },
  navSignOut: {
    marginTop: "auto",
    backgroundColor: "transparent",

    border: "none",
    width: "100%",
    textAlign: "left",
    padding: "12px 16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
    gap: "8px",
  },


});


const Personal = bundleIcon(Home32Filled, Home32Regular);
const Square = bundleIcon(LeafTwo32Filled, LeafTwo32Regular);




const NavDrawerDefault = (props: Partial<NavDrawerProps>) => {
  
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSignOut = () => {
    window.location.href = "/src/logic/logic.html";
  };

  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content="Navigation" relationship="label">
        <Button
          className={styles.button}
          onClick={() => setIsOpen(!isOpen)}
          icon={isOpen ? <ArrowExportRtlFilled /> : <ArrowExportLtrFilled />}
          size="large"
        />
      </Tooltip>
    );
  };

  return (
    <div className={styles.root}>
      <NavDrawer
        className={styles.navDrawer}
        defaultSelectedValue="1"
        open={isOpen}

      >
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>

        <NavSectionHeader>Navigation</NavSectionHeader>

        <NavDivider />

        <NavDrawerBody>

          <NavItem icon={<Personal />} value="1" className={styles.navItemText}>
            Personal Page
          </NavItem>

          <NavItem icon={<Square />} value="2" className={styles.navItemText}>
            Hobby Square
          </NavItem>


        </NavDrawerBody>

        <NavDrawerBody>

          <Dialog open={isDialogOpen} onOpenChange={(_, data) => setIsDialogOpen(data.open)}>
            <DialogTrigger>

              <button className={styles.navSignOut} onClick={() => setIsDialogOpen(true)}>
                <ArrowHookDownLeft28Filled />
                <span>Sign Out</span>
              </button>

            </DialogTrigger>

            <DialogSurface>

              <DialogBody>
                <DialogTitle>Confirm Sign Out</DialogTitle>
                <DialogContent>Are you sure you want to sign out?</DialogContent>

                <DialogActions>

                  <Button onClick={handleSignOut} style={{ backgroundColor: "#d13438", color: "white" }} >Yes</Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                </DialogActions>
              </DialogBody>

            </DialogSurface>

          </Dialog>

        </NavDrawerBody>

      </NavDrawer>

      <div className={styles.content}>
        {!isOpen && renderHamburgerWithToolTip()}

        <div className={styles.field}>




        </div>

      </div>
    </div>
  );
};





export default NavDrawerDefault;
