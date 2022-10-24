import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import React from "react";
import { Logo } from "../logo";

export const Header: React.FC = () => (
    <Box
        sx={{
            backgroundColor: 'primary.main',
            position: 'sticky',
            top: 0,
            padding: '1rem 0',
            zIndex: 1,
            boxShadow: 5
        }}
    >
        <Container
            sx={{
                margin: 0
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
            >
                <Logo />
            </Stack>
        </Container>
    </Box>
)