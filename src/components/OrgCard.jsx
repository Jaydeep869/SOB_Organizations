import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box, Chip, IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import sobLogo from '../assets/images/sob-logo.png';
import { slugify } from '../utils/slugify';

const OrgCard = ({ data, index }) => {
    const years = Object.keys(data.years).sort().reverse();
    const visibleTech = data.technologies.slice(0, 4);
    const extraTech = data.technologies.length > 4 ? data.technologies.length - 4 : 0;

    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
                }
            }}
        >
            {/* External link — only show if there's a real URL (not summerofbitcoin.org placeholder) */}
            {data.url && !data.url.includes('summerofbitcoin.org') && (
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(data.url, '_blank', 'noopener,noreferrer');
                    }}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 10,
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(4px)',
                        '&:hover': { bgcolor: 'white', transform: 'scale(1.1)' },
                        transition: 'all 0.2s',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    <OpenInNewIcon fontSize="inherit" sx={{ color: 'text.secondary', fontSize: '14px' }} />
                </IconButton>
            )}

            <CardActionArea
                component="a"
                href={`/org/${slugify(data.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}
            >
                {/* Logo Banner Area */}
                <Box
                    sx={{
                        height: 112,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        bgcolor: data.image_background_color || '#fafafa',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        transition: 'background-color 0.5s ease',
                        '&:hover .logo-img': {
                            transform: 'scale(1.1)',
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.02), transparent)',
                        }
                    }}
                >

                    <Box
                        component="img"
                        className="logo-img"
                        src={`https://github.com/${slugify(data.name)}.png`}
                        alt={`${data.name} logo`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = sobLogo;
                        }}
                        sx={{
                            width: 64,
                            height: 64,
                            objectFit: 'contain',
                            position: 'relative',
                            zIndex: 1,
                            transition: 'transform 0.2s ease',
                        }}
                    />
                </Box>

                {/* Content Area */}
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5, overflow: 'hidden' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2, mt: 1 }}>
                        <Typography
                            variant="subtitle1"
                            component="h3"
                            align="center"
                            sx={{
                                fontWeight: 700,
                                lineHeight: 1.2,
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                width: '100%',
                            }}
                        >
                            {data.name}
                        </Typography>
                        <Chip
                            label={data.category}
                            size="small"
                            sx={{
                                bgcolor: 'primary.light',
                                color: 'primary.dark',
                                fontWeight: 700,
                                fontSize: '10px',
                                height: 20,
                                borderRadius: '10px',
                            }}
                        />
                    </Box>

                    <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        {/* Years */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.5, width: '100%' }}>
                            {years.map(year => (
                                <Box key={year} sx={{ bgcolor: '#27272a', color: 'white', px: 1, py: 0.25, borderRadius: 1, fontSize: '10px', fontWeight: 700, letterSpacing: 0.5 }}>
                                    {year}
                                </Box>
                            ))}
                        </Box>

                        {/* Technologies */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.5, width: '100%' }}>
                            {visibleTech.map(tech => (
                                <Chip key={tech} label={tech} size="small" variant="outlined" sx={{ height: 20, fontSize: '10px', fontWeight: 500, borderColor: '#e4e4e7', color: 'text.secondary', bgcolor: '#fafafa' }} />
                            ))}
                            {extraTech > 0 && (
                                <Chip label={`+${extraTech}`} size="small" sx={{ height: 20, fontSize: '10px', fontWeight: 500, bgcolor: '#f4f4f5', color: 'text.secondary' }} />
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default OrgCard;
