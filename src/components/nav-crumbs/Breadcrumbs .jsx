import React from 'react';
import GrainIcon from '@mui/icons-material/Grain';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Link } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

const BreadcrumbsNav = (props) => {
    const { title, subtitle, childTitle } = props
    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                {title && (
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/"
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        {title}
                    </Link>
                )}
                {subtitle && (
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        {subtitle}
                    </Link>
                )}
                {childTitle && (
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="text.primary"
                    >
                        <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        {childTitle}
                    </Typography>
                )}

            </Breadcrumbs>
        </div>
    );
};

export default BreadcrumbsNav;