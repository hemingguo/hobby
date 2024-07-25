import * as React from "react"
import Per from './personal/personal_app.tsx'
import Squ from './square/square_app.tsx'
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
    border: "none",
    marginTop: "10px",
    marginLeft: "5px",
    borderRadius: "5px",
    backgroundColor: "#ebf3fc",
    color: tokens.colorNeutralForeground1,
    '&:hover': {
      backgroundColor: "lightblue",
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
    borderBottomRightRadius: "50px",
    overflow: "hidden",
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
  const [page, setPage] = React.useState(2);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const drawerRef = React.useRef<HTMLDivElement>(null);

  const handleSignOut = () => {
    window.location.href = "/src/logic/logic.html";
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(true); // Open the drawer when ESC is pressed
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
        defaultSelectedValue="2"
        open={isOpen}
        ref={drawerRef}
      >
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>
        <NavSectionHeader>Navigation</NavSectionHeader>
        <NavDivider />
        <NavDrawerBody>
          <NavItem onClick={() => setPage(1)} icon={<Personal />} value="1" className={styles.navItemText}>
            Personal Page
          </NavItem>
          <NavItem onClick={() => setPage(2)} icon={<Square />} value="2" className={styles.navItemText}>
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
      <div>
        {renderHamburgerWithToolTip()}
        {page === 1 && <Per />}
        {page === 2 && <Squ />}
      </div>
    </div>
  );
};

export default NavDrawerDefault;
