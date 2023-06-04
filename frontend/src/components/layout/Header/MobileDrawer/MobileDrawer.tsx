import NextLink from "next/link";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

interface IProps {
  open: boolean;
  handleToggle: () => void;
}

function MobileDrawer({ open, handleToggle }: IProps) {
  return (
    <Box component="nav">
      <Drawer
        open={open}
        onClose={handleToggle}
        anchor="right"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "260px",
          },
        }}
      >
        <Box onClick={handleToggle} sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Welcome Blog
          </Typography>
          <Divider variant="middle" />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/"
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={NextLink}
                href="/blog"
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary="Articles" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider variant="middle" />
        </Box>
      </Drawer>
    </Box>
  );
}

export default MobileDrawer;
