import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/users/usersThunks";
import { User } from "../../type";

interface Props {
  user: User;
}

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        Привет, {user.displayName ? user.displayName : user.username}!
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
            <Link to="/trackHistory">История</Link>
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
            <Link to="/artists/create">Добавить нового Артиста</Link>
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
            <Link to="/albums/create">Добавить новый альбом</Link>
          </Typography>
        </MenuItem>{" "}
        <MenuItem>
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
            <Link to="/tracks/create">Добавить новый трек</Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Выход</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
