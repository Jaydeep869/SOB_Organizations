import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, Paper, Chip, Grid, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GridViewIcon from '@mui/icons-material/GridView';
import TagIcon from '@mui/icons-material/Tag';
import CodeIcon from '@mui/icons-material/Code';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import { getSobData } from '../data';
import sobLogo from '../assets/images/sob-logo.png';
import { slugify } from '../utils/slugify';

const OrgDetail = () => {
    const { orgSlug } = useParams();
    const orgData = getSobData();
    const organization = orgData.find(org => slugify(org.name) === orgSlug);

    useEffect(() => {
        document.title = organization
            ? `${organization.name} | SoB Organizations`
            : 'Not Found | SoB Organizations';
    }, [organization]);

    if (!organization) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', px: 2 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>Organization not found</Typography>
                <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ fontWeight: 'bold' }}>
                    Go back
                </Button>
            </Box>
        );
    }

    const availableYears = Object.keys(organization.years).sort().reverse();

    // Data for the graph (chronological)
    const graphData = Object.keys(organization.years).sort().map(year => ({
        year,
        projects: organization.years[year].num_projects || 0
    }));

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
            {/* Sticky Header */}
            <Box sx={{
                position: 'sticky', top: 0, zIndex: 40,
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid', borderColor: 'divider'
            }}>
                <Container maxWidth="lg" sx={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Button component={Link} to="/" startIcon={<ArrowBackIcon fontSize="small" />} sx={{ color: 'text.secondary', fontWeight: 600, '&:hover': { color: 'text.primary', bgcolor: 'transparent' }, minWidth: 'auto' }}>
                            Home
                        </Button>
                        <Typography variant="body2" sx={{ color: 'text.disabled', mx: 0.5, fontWeight: 500 }}>›</Typography>
                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 700 }}>
                            {organization.name}
                        </Typography>
                    </Box>
                    {organization.url && !organization.url.includes('summerofbitcoin.org') && (
                        <Button
                            href={organization.url}
                            target="_blank"
                            rel="noreferrer"
                            endIcon={<OpenInNewIcon fontSize="small" />}
                            sx={{ fontWeight: 800, fontSize: '11px', letterSpacing: 1, bgcolor: 'primary.light', color: 'primary.dark', px: 2, borderRadius: 2, '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
                        >
                            Visit Repo
                        </Button>
                    )}
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ pt: 6 }}>

                {/* Main Info Card */}
                <Paper elevation={0} sx={{ borderRadius: 6, border: '1px solid', borderColor: 'divider', overflow: 'hidden', mb: 4, boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                    {/* Top colored strip / logo presentation */}
                    <Box sx={{ height: 140, bgcolor: '#1a1a2e', position: 'relative' }}>
                        {/* Absolute positioning of the logo to break the border */}
                        <Paper elevation={3} sx={{ position: 'absolute', bottom: -40, left: 40, p: 1, borderRadius: 4, bgcolor: 'white', border: '1px solid', borderColor: 'divider' }}>
                            <Box
                                component="img"
                                src={`https://github.com/${slugify(organization.name)}.png`}
                                alt={`${organization.name} logo`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = sobLogo;
                                }}
                                sx={{
                                    width: 96, height: 96, borderRadius: 3, objectFit: 'contain',
                                    bgcolor: organization.image_background_color || '#fafafa',
                                }}
                            />
                        </Paper>
                        {/* Category badge */}
                        <Box sx={{ position: 'absolute', top: 24, right: 24 }}>
                            <Chip
                                label={organization.category}
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.1)', color: 'white', backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255,255,255,0.2)', fontWeight: 800, fontSize: '10px',
                                    letterSpacing: 2, textTransform: 'uppercase', height: 28, borderRadius: '14px',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ pt: 8, pb: 6, px: { xs: 3, md: 5 } }}>
                        <Typography variant="h3" fontWeight={900} gutterBottom sx={{ color: 'text.primary', letterSpacing: '-0.02em', mb: 4 }}>
                            {organization.name}
                        </Typography>

                        <Grid container spacing={6}>
                            {/* Full Width: Description & Topics */}
                            <Grid size={12}>
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontWeight: 800, letterSpacing: 2, mb: 1 }}>
                                        <GridViewIcon fontSize="small" /> Overview
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.8, fontSize: '1.1rem' }}>
                                        {organization.description}
                                    </Typography>
                                </Box>

                                {/* Topics & Tech */}
                                <Grid container spacing={4}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontWeight: 800, letterSpacing: 2, mb: 1 }}>
                                            <TagIcon fontSize="small" /> Topics
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {organization.topics.map(t => (
                                                <Chip key={t} label={t} sx={{ bgcolor: '#f4f4f5', color: 'text.secondary', fontWeight: 600, borderRadius: 2, border: '1px solid #e4e4e7' }} />
                                            ))}
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontWeight: 800, letterSpacing: 2, mb: 1 }}>
                                            <CodeIcon fontSize="small" /> Technologies
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {organization.technologies.map(t => (
                                                <Chip key={t} label={t} sx={{ bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 700, borderRadius: 2, border: '1px solid rgba(245, 158, 11, 0.2)' }} />
                                            ))}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Full Width: Graph */}
                            <Grid size={12} sx={{ mt: 2 }}>
                                <Box sx={{
                                    bgcolor: '#ffffff', border: '1px solid #f0f0f5', borderRadius: 4, p: 4,
                                    boxShadow: '0 4px 20px -4px rgba(0,0,0,0.03)'
                                }}>
                                    <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontWeight: 800, letterSpacing: 2, mb: 4 }}>
                                        <TrendingUpIcon fontSize="small" /> Project History
                                    </Typography>
                                    <Box sx={{ width: '100%', height: 300 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={graphData} margin={{ top: 24, right: 20, left: 0, bottom: 24 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f5" />
                                                <XAxis
                                                    dataKey="year"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 13, fontWeight: 700, fill: '#52525b' }}
                                                    dy={10}
                                                />
                                                <YAxis
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 12, fontWeight: 600, fill: '#a1a1aa' }}
                                                    allowDecimals={false}
                                                    width={40}
                                                />
                                                <Tooltip
                                                    cursor={{ fill: 'rgba(245, 158, 11, 0.05)' }}
                                                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', fontWeight: 600, padding: '12px 16px' }}
                                                    formatter={(value) => [value, 'Projects']}
                                                    labelStyle={{ color: '#71717a', marginBottom: '8px' }}
                                                />
                                                <Bar
                                                    dataKey="projects"
                                                    fill="#f59e0b"
                                                    radius={[6, 6, 0, 0]}
                                                    maxBarSize={60}
                                                    animationDuration={600}
                                                >
                                                    <LabelList dataKey="projects" position="top" style={{ fontSize: 13, fontWeight: 700, fill: '#52525b' }} />
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>

                {/* Projects by Year */}
                <Paper elevation={0} sx={{ borderRadius: 6, border: '1px solid', borderColor: 'divider', overflow: 'hidden', mb: 4, boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                        <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontWeight: 800, letterSpacing: 2, mb: 4, fontSize: '0.85rem' }}>
                            <FolderIcon fontSize="small" /> Projects by Year
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {availableYears.map(year => {
                                const yearData = organization.years[year];
                                const hasProjects = yearData.projects && yearData.projects.length > 0;

                                return (
                                    <Paper
                                        key={year}
                                        elevation={0}
                                        sx={{
                                            border: '1px solid', borderColor: 'divider', borderRadius: 4,
                                            overflow: 'hidden', transition: 'border-color 0.12s ease',
                                            '&:hover': { borderColor: 'primary.main' }
                                        }}
                                    >
                                        {/* Year header */}
                                        <Box sx={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            px: 3, py: 2, bgcolor: '#fafafa', borderBottom: '1px solid', borderColor: 'divider'
                                        }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <CalendarTodayIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                                                <Typography variant="h6" fontWeight={800} sx={{ color: 'text.primary' }}>
                                                    {year}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label={`${yearData.num_projects} project${yearData.num_projects !== 1 ? 's' : ''}`}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'primary.light', color: 'primary.dark',
                                                    fontWeight: 700, fontSize: '11px', height: 24, borderRadius: '12px'
                                                }}
                                            />
                                        </Box>

                                        {/* Projects list */}
                                        <Box sx={{ p: 3 }}>
                                            {hasProjects ? (
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                    {yearData.projects.map((project, idx) => (
                                                        <Box
                                                            key={idx}
                                                            sx={{
                                                                display: 'flex', flexDirection: 'column', gap: 0.5,
                                                                p: 2, borderRadius: 3, bgcolor: '#fafafa',
                                                                border: '1px solid #f0f0f5',
                                                            }}
                                                        >
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <PersonIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                                                <Typography variant="subtitle2" fontWeight={700} sx={{ color: 'text.primary' }}>
                                                                    {project.name}
                                                                </Typography>
                                                            </Box>
                                                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, pl: 3 }}>
                                                                {project.project}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
                                                    Project details not available for this year.
                                                </Typography>
                                            )}
                                        </Box>
                                    </Paper>
                                );
                            })}
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default OrgDetail;
