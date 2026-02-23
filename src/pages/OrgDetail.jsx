import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Paper, Chip, Grid, Container } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
                <Button component="a" href="/" sx={{ fontWeight: 'bold' }}>
                    Go back
                </Button>
            </Box>
        );
    }

    const availableYears = Object.keys(organization.years).sort().reverse();

    const graphData = Object.keys(organization.years).sort().map(year => ({
        year,
        projects: organization.years[year].num_projects || 0
    }));

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
            {/* Sticky Header — SoB logo+name on left, org name on right */}
            <Box sx={{
                position: 'sticky', top: 0, zIndex: 40,
                bgcolor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid', borderColor: 'divider',
            }}>
                <Container maxWidth="lg" sx={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Left: SoB branding */}
                    <Box
                        component="a"
                        href="/"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', '&:hover': { opacity: 0.8 } }}
                    >
                        <Box
                            component="img"
                            src={sobLogo}
                            alt="SoB"
                            sx={{ width: 28, height: 28, borderRadius: 1.5, objectFit: 'contain' }}
                        />
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#d97706', fontSize: '13px', letterSpacing: '-0.01em' }}>
                            SoB Organizations
                        </Typography>
                    </Box>

                    {/* Right: Org name */}
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '13px', maxWidth: '50%', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {organization.name}
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ pt: 5 }}>

                {/* Hero: Logo + Name + Category + Visit Repo */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 5 }}>
                    <Paper elevation={0} sx={{ p: 1.5, borderRadius: 4, border: '1px solid', borderColor: 'divider', flexShrink: 0, bgcolor: 'white' }}>
                        <Box
                            component="img"
                            src={`https://github.com/${slugify(organization.name)}.png`}
                            alt={`${organization.name} logo`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = sobLogo;
                            }}
                            sx={{
                                width: 72, height: 72, borderRadius: 3, objectFit: 'contain',
                                bgcolor: organization.image_background_color || '#fafafa',
                            }}
                        />
                    </Paper>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h4" fontWeight={900} sx={{ color: 'text.primary', letterSpacing: '-0.02em', mb: 0.5 }}>
                            {organization.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                            <Chip
                                label={organization.category}
                                size="small"
                                sx={{
                                    bgcolor: '#f4f4f5', color: 'text.secondary', fontWeight: 700,
                                    fontSize: '11px', height: 24, borderRadius: '12px', border: '1px solid #e4e4e7',
                                }}
                            />
                            {organization.url && !organization.url.includes('summerofbitcoin.org') && (
                                <Button
                                    href={organization.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    size="small"
                                    endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                                    sx={{ fontWeight: 700, fontSize: '11px', color: 'text.secondary', '&:hover': { color: 'primary.dark' }, textTransform: 'none', minWidth: 'auto', p: 0 }}
                                >
                                    Visit Repo
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* Two-column layout: Left info, Right graph */}
                <Grid container spacing={4} sx={{ mb: 5 }}>
                    {/* LEFT: Description, Topics, Technologies */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', p: { xs: 3, md: 4 }, height: '100%', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                            {/* Description */}
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="overline" sx={{ color: 'text.disabled', fontWeight: 800, letterSpacing: 2, mb: 1, display: 'block', fontSize: '11px' }}>
                                    Description
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.8, fontSize: '1rem' }}>
                                    {organization.description}
                                </Typography>
                            </Box>

                            {/* Topics */}
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled', fontWeight: 800, letterSpacing: 2, mb: 1, fontSize: '11px' }}>
                                    <TagIcon sx={{ fontSize: 14 }} /> Topics
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                                    {organization.topics.map(t => (
                                        <Chip key={t} label={t} size="small" sx={{ bgcolor: '#f4f4f5', color: 'text.secondary', fontWeight: 600, fontSize: '12px', height: 26, borderRadius: 2, border: '1px solid #e4e4e7' }} />
                                    ))}
                                </Box>
                            </Box>

                            {/* Technologies */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled', fontWeight: 800, letterSpacing: 2, mb: 1, fontSize: '11px' }}>
                                    <CodeIcon sx={{ fontSize: 14 }} /> Technologies
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                                    {organization.technologies.map(t => (
                                        <Chip key={t} label={t} size="small" sx={{ bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 700, fontSize: '12px', height: 26, borderRadius: 2, border: '1px solid rgba(245,158,11,0.15)' }} />
                                    ))}
                                </Box>
                            </Box>

                            {/* Years participated */}
                            <Box>
                                <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled', fontWeight: 800, letterSpacing: 2, mb: 1, fontSize: '11px' }}>
                                    <CalendarTodayIcon sx={{ fontSize: 14 }} /> Years
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {availableYears.map(y => (
                                        <Box key={y} sx={{ bgcolor: '#27272a', color: 'white', px: 1.25, py: 0.25, borderRadius: 1.5, fontSize: '11px', fontWeight: 700 }}>
                                            {y}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* RIGHT: Graph */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', p: { xs: 3, md: 4 }, height: '100%', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                            <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled', fontWeight: 800, letterSpacing: 2, mb: 3, fontSize: '11px' }}>
                                <TrendingUpIcon sx={{ fontSize: 14 }} /> Project History
                            </Typography>
                            <Box sx={{ width: '100%', height: 280 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={graphData} margin={{ top: 20, right: 10, left: -10, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f5" />
                                        <XAxis
                                            dataKey="year"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fontWeight: 700, fill: '#52525b' }}
                                            dy={8}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 11, fontWeight: 600, fill: '#a1a1aa' }}
                                            allowDecimals={false}
                                            width={35}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(245, 158, 11, 0.05)' }}
                                            contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 600, padding: '10px 14px', fontSize: '13px' }}
                                            formatter={(value) => [value, 'Projects']}
                                            labelStyle={{ color: '#71717a', marginBottom: '4px' }}
                                        />
                                        <Bar
                                            dataKey="projects"
                                            fill="#f59e0b"
                                            radius={[5, 5, 0, 0]}
                                            maxBarSize={48}
                                            animationDuration={600}
                                        >
                                            <LabelList dataKey="projects" position="top" style={{ fontSize: 12, fontWeight: 700, fill: '#52525b' }} />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Past Programs / Projects by Year — full width at bottom */}
                <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                        <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled', fontWeight: 800, letterSpacing: 2, mb: 4, fontSize: '12px' }}>
                            <FolderIcon sx={{ fontSize: 16 }} /> Past Programs
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            {availableYears.map(year => {
                                const yearData = organization.years[year];
                                const hasProjects = yearData.projects && yearData.projects.length > 0;

                                return (
                                    <Paper
                                        key={year}
                                        elevation={0}
                                        sx={{
                                            border: '1px solid', borderColor: 'divider', borderRadius: 3,
                                            overflow: 'hidden', transition: 'box-shadow 0.12s ease',
                                            '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }
                                        }}
                                    >
                                        {/* Year header */}
                                        <Box sx={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            px: 3, py: 1.5, bgcolor: '#fafafa', borderBottom: '1px solid', borderColor: 'divider'
                                        }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CalendarTodayIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                                <Typography variant="subtitle1" fontWeight={800} sx={{ color: 'text.primary' }}>
                                                    {year}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label={`${yearData.num_projects} project${yearData.num_projects !== 1 ? 's' : ''}`}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'primary.light', color: 'primary.dark',
                                                    fontWeight: 700, fontSize: '11px', height: 22, borderRadius: '11px'
                                                }}
                                            />
                                        </Box>

                                        {/* Projects list */}
                                        <Box sx={{ p: 2.5 }}>
                                            {hasProjects ? (
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                                    {yearData.projects.map((project, idx) => (
                                                        <Box
                                                            key={idx}
                                                            sx={{
                                                                display: 'flex', flexDirection: 'column', gap: 0.25,
                                                                p: 2, borderRadius: 2.5, bgcolor: '#fafafa',
                                                                border: '1px solid #f0f0f5',
                                                            }}
                                                        >
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <PersonIcon sx={{ fontSize: 15, color: 'primary.main' }} />
                                                                <Typography variant="subtitle2" fontWeight={700} sx={{ color: 'text.primary', fontSize: '13px' }}>
                                                                    {project.name}
                                                                </Typography>
                                                            </Box>
                                                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, pl: 3, fontSize: '12.5px' }}>
                                                                {project.project}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" sx={{ color: 'text.disabled', fontStyle: 'italic', fontSize: '12.5px' }}>
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
