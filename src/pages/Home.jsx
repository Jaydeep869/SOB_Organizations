import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography, TextField, InputAdornment, Grid, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { getSobData } from '../data';
import Sidebar from '../components/Sidebar';
import OrgCard from '../components/OrgCard';

// Custom hook — extracted to top-level to follow Rules of Hooks
const useArrayStats = (orgs, key) => {
    return useMemo(() => {
        const counts = {};
        orgs.forEach(org => {
            org[key].forEach(item => {
                counts[item] = (counts[item] || 0) + 1;
            });
        });
        return Object.entries(counts).map(([name, freq]) => ({ name, frequency: freq })).sort((a, b) => b.frequency - a.frequency);
    }, [orgs, key]);
};

const Home = () => {
    useEffect(() => {
        document.title = 'Home | SoB Organizations';
    }, []);

    const allOrgs = getSobData();

    const allTech = useArrayStats(allOrgs, 'technologies');
    const allTopics = useArrayStats(allOrgs, 'topics');

    const allYears = useMemo(() => {
        const counts = {};
        allOrgs.forEach(org => {
            Object.keys(org.years).forEach(year => {
                counts[year] = (counts[year] || 0) + 1;
            });
        });
        return Object.entries(counts).map(([name, freq]) => ({ name, frequency: freq })).sort((a, b) => b.name.localeCompare(a.name));
    }, [allOrgs]);

    // State
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTech, setSelectedTech] = useState(new Set());
    const [selectedTopics, setSelectedTopics] = useState(new Set());
    const [selectedYears, setSelectedYears] = useState(new Set());
    const [mobileOpen, setMobileOpen] = useState(false);
    const [firstTimeOnly, setFirstTimeOnly] = useState(false);

    // Find the latest year across all orgs
    const latestYear = useMemo(() => {
        let max = '0';
        allOrgs.forEach(org => {
            Object.keys(org.years).forEach(y => { if (y > max) max = y; });
        });
        return max;
    }, [allOrgs]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedTech(new Set());
        setSelectedTopics(new Set());
        setSelectedYears(new Set());
        setFirstTimeOnly(false);
    };

    const filteredOrgs = useMemo(() => {
        return allOrgs.filter(org => {
            if (searchTerm && !org.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;

            if (firstTimeOnly) {
                const orgYears = Object.keys(org.years);
                // First time = appeared only in the latest year (single year entry that is the latest)
                if (!(orgYears.length === 1 && orgYears[0] === latestYear)) return false;
            }

            if (selectedTech.size > 0) {
                const hasAnyTech = [...selectedTech].some(t => org.technologies.includes(t));
                if (!hasAnyTech) return false;
            }

            if (selectedTopics.size > 0) {
                const hasAllTopics = [...selectedTopics].every(t => org.topics.includes(t));
                if (!hasAllTopics) return false;
            }

            if (selectedYears.size > 0) {
                const orgYears = Object.keys(org.years);
                const hasAllYears = [...selectedYears].every(y => orgYears.includes(y));
                if (!hasAllYears) return false;
            }

            return true;
        });
    }, [allOrgs, searchTerm, selectedTech, selectedTopics, selectedYears, firstTimeOnly, latestYear]);

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh' }}>
            {/* Sidebar */}
            <Sidebar
                allTech={allTech} selectedTech={selectedTech} setSelectedTech={setSelectedTech}
                allTopics={allTopics} selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics}
                allYears={allYears} selectedYears={selectedYears} setSelectedYears={setSelectedYears}
                clearFilters={clearFilters}
                mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
                firstTimeOnly={firstTimeOnly} setFirstTimeOnly={setFirstTimeOnly}
                latestYear={latestYear}
            />

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>

                {/* Top Search Bar (Sticky) */}
                <Box
                    sx={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 20,
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(12px)',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        px: { xs: 3, md: 5 },
                        py: 2,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                    }}
                >
                    <Box sx={{ maxWidth: 600, mx: { xs: 'auto', md: 0 }, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        {/* Mobile hamburger */}
                        <IconButton
                            onClick={() => setMobileOpen(true)}
                            sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.secondary' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <TextField
                            fullWidth
                            placeholder="Search organizations by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: '24px',
                                    bgcolor: '#f4f4f5',
                                    px: 1,
                                    '& fieldset': { borderColor: 'transparent' },
                                    '&:hover fieldset': { borderColor: 'transparent' },
                                    '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: '2px' },
                                    '&.Mui-focused': { bgcolor: '#fff', boxShadow: '0 0 0 4px rgba(245, 158, 11, 0.1)' },
                                    transition: 'all 0.2s ease',
                                }
                            }}
                        />
                    </Box>
                </Box>

                {/* Content Wrapper */}
                <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 1.5, md: 2 }, flexGrow: 1 }}>
                    {/* Results Tracker — inline, compact */}
                    <Typography
                        variant="caption"
                        sx={{ display: 'block', textAlign: 'center', mb: 2, color: 'text.secondary', fontWeight: 500, letterSpacing: 0.3 }}
                    >
                        {filteredOrgs.length} organizations
                    </Typography>

                    {/* Grid */}
                    <Grid container spacing={3}>
                        {filteredOrgs.map((org, idx) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={org.name}>
                                <OrgCard data={org} index={idx} />
                            </Grid>
                        ))}
                    </Grid>

                    {filteredOrgs.length === 0 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 15, textAlign: 'center' }}>
                            <Box sx={{ width: 80, height: 80, mb: 3, borderRadius: '24px', bgcolor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <SearchIcon sx={{ fontSize: 40, color: 'grey.300' }} />
                            </Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                No organizations found
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, mb: 3 }}>
                                We couldn't find any organizations matching your current filters. Try adjusting them.
                            </Typography>
                            <Typography
                                variant="body2"
                                color="primary.main"
                                fontWeight="bold"
                                onClick={clearFilters}
                                sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                            >
                                Clear all filters
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
