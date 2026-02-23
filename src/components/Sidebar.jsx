import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Drawer, IconButton, Switch } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import FilterBlock from './FilterBlock';
import sobLogo from '../assets/images/sob-logo.png';

const SIDEBAR_WIDTH = 280;

const Sidebar = ({
    allTech, selectedTech, setSelectedTech,
    allTopics, selectedTopics, setSelectedTopics,
    allYears, selectedYears, setSelectedYears,
    clearFilters,
    mobileOpen, setMobileOpen,
    firstTimeOnly, setFirstTimeOnly,
    latestYear,
}) => {
    const toggleSet = (set, setter) => (item) => {
        const newSet = new Set(set);
        if (newSet.has(item)) newSet.delete(item);
        else newSet.add(item);
        setter(newSet);
    };

    const sidebarContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            {/* Brand Header */}
            <Box
                sx={{
                    p: 3,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    position: 'sticky',
                    top: 0,
                    bgcolor: 'rgba(248, 249, 250, 0.95)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <Box
                        component="img"
                        src={sobLogo}
                        alt="Summer of Bitcoin"
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 2,
                            objectFit: 'contain',
                        }}
                    />
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#d97706', lineHeight: 1.3, letterSpacing: '-0.01em', fontSize: '14px' }}>
                        SoB Organizations
                    </Typography>
                </Link>

                {/* Close button — mobile only */}
                <IconButton
                    onClick={() => setMobileOpen(false)}
                    sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.secondary' }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box sx={{ p: 2.5 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={clearFilters}
                    size="small"
                    sx={{
                        mb: 2,
                        color: 'text.secondary',
                        borderColor: 'divider',
                        fontWeight: 600,
                        fontSize: '12px',
                        py: 0.75,
                        borderRadius: 2,
                        '&:hover': { borderColor: 'primary.main', color: 'primary.dark', bgcolor: 'rgba(245,158,11,0.04)' },
                    }}
                >
                    Clear filters
                </Button>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {/* First Time Org toggle */}
                    <Box
                        onClick={() => setFirstTimeOnly(!firstTimeOnly)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            py: 1.5,
                            px: 1.5,
                            borderRadius: 2,
                            cursor: 'pointer',
                            bgcolor: firstTimeOnly ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
                            border: '1px solid',
                            borderColor: firstTimeOnly ? 'primary.main' : 'divider',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: firstTimeOnly ? 'rgba(245, 158, 11, 0.12)' : 'rgba(0,0,0,0.02)',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <NewReleasesIcon sx={{ fontSize: 18, color: firstTimeOnly ? 'primary.dark' : 'text.secondary' }} />
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: firstTimeOnly ? 'primary.dark' : 'text.primary', lineHeight: 1.2 }}>
                                    First Time Orgs
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '10px' }}>
                                    New in {latestYear}
                                </Typography>
                            </Box>
                        </Box>
                        <Switch
                            checked={firstTimeOnly}
                            size="small"
                            sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': { color: 'primary.main' },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: 'primary.main' },
                            }}
                        />
                    </Box>

                    <FilterBlock title="Years" items={allYears} selectedSet={selectedYears} toggleFn={toggleSet(selectedYears, setSelectedYears)} />
                    <FilterBlock title="Technologies" items={allTech} selectedSet={selectedTech} toggleFn={toggleSet(selectedTech, setSelectedTech)} />
                    <FilterBlock title="Topics" items={allTopics} selectedSet={selectedTopics} toggleFn={toggleSet(selectedTopics, setSelectedTopics)} />
                </Box>
            </Box>

            {/* Footer: Star, Contribute & Credits */}
            <Box sx={{ mt: 'auto', p: 2.5, borderTop: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        startIcon={<StarBorderIcon sx={{ fontSize: 16 }} />}
                        onClick={() => window.open('https://github.com/Jaydeep869/SOB_Organizations', '_blank')}
                        sx={{
                            fontWeight: 700, fontSize: '11px', py: 0.75, borderRadius: 2,
                            borderColor: '#e4e4e7', color: 'text.secondary',
                            '&:hover': { borderColor: '#f59e0b', color: '#d97706', bgcolor: 'rgba(245,158,11,0.04)' },
                        }}
                    >
                        Star
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        startIcon={<GitHubIcon sx={{ fontSize: 16 }} />}
                        onClick={() => window.open('https://github.com/Jaydeep869/SOB_Organizations', '_blank')}
                        sx={{
                            fontWeight: 700, fontSize: '11px', py: 0.75, borderRadius: 2,
                            bgcolor: '#27272a', color: 'white',
                            '&:hover': { bgcolor: '#3f3f46' },
                        }}
                    >
                        Contribute
                    </Button>
                </Box>

                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, color: 'text.disabled', fontSize: '11px' }}>
                    Made with <FavoriteIcon sx={{ fontSize: 12, color: '#ef4444' }} /> by
                    <Box
                        component="a"
                        href="https://github.com/Jaydeep869"
                        target="_blank"
                        rel="noreferrer"
                        sx={{ color: 'text.secondary', fontWeight: 600, textDecoration: 'none', '&:hover': { color: '#d97706' } }}
                    >
                        Jaydeep
                    </Box>
                </Typography>

                <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 0.5, color: 'text.disabled', fontSize: '10px' }}>
                    Inspired by{' '}
                    <Box
                        component="a"
                        href="https://github.com/nishantwrp/gsoc-organizations"
                        target="_blank"
                        rel="noreferrer"
                        sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: '#d97706', textDecoration: 'underline' } }}
                    >
                        GSoC Organizations
                    </Box>
                </Typography>
            </Box>
        </Box>
    );

    return (
        <>
            {/* Desktop sidebar — always visible on md+ */}
            <Box
                component="aside"
                sx={{
                    width: SIDEBAR_WIDTH,
                    flexShrink: 0,
                    bgcolor: '#f8f9fa',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    height: '100vh',
                    position: 'sticky',
                    top: 0,
                    overflowY: 'auto',
                    display: { xs: 'none', md: 'block' },
                }}
            >
                {sidebarContent}
            </Box>

            {/* Mobile drawer — slides in from left on xs/sm */}
            <Drawer
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: SIDEBAR_WIDTH,
                        boxSizing: 'border-box',
                        bgcolor: '#f8f9fa',
                    },
                }}
            >
                {sidebarContent}
            </Drawer>
        </>
    );
};

export default Sidebar;
