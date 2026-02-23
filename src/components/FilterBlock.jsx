import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Collapse,
    Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const FilterBlock = ({ title, items, selectedSet, toggleFn }) => {
    const [search, setSearch] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const visibleItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const displayItems = (isExpanded || search) ? visibleItems : visibleItems.slice(0, 5);
    const hasMore = !isExpanded && !search && visibleItems.length > 5;

    return (
        <Box sx={{ py: 2, borderBottom: '1px solid', borderColor: 'divider', '&:last-child': { borderBottom: 'none' } }}>
            <Typography variant="overline" sx={{ px: 1, fontWeight: 'bold', color: 'text.secondary', letterSpacing: 1.2 }}>
                {title}
            </Typography>

            <Box sx={{ px: 1, my: 1 }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder={`Search ${title.toLowerCase()}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: '#f8f8f8',
                            '& fieldset': { borderColor: 'transparent' },
                            '&:hover fieldset': { borderColor: '#e0e0e0' },
                            '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: '1px' },
                            '&.Mui-focused': { backgroundColor: '#fff', boxShadow: '0 0 0 3px rgba(245, 158, 11, 0.1)' },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <List dense disablePadding>
                {displayItems.map((item) => {
                    const isChecked = selectedSet.has(item.name);
                    return (
                        <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                role={undefined}
                                onClick={() => toggleFn(item.name)}
                                sx={{
                                    borderRadius: '6px',
                                    backgroundColor: isChecked ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: isChecked ? 'rgba(245, 158, 11, 0.12)' : 'rgba(0,0,0,0.04)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                    <Checkbox
                                        edge="start"
                                        checked={isChecked}
                                        disableRipple
                                        size="small"
                                        sx={{
                                            p: 0.5,
                                            color: '#d1d5db',
                                            '&.Mui-checked': { color: 'primary.main' },
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.name}
                                    primaryTypographyProps={{
                                        variant: 'body2',
                                        fontWeight: isChecked ? 600 : 400,
                                        color: isChecked ? 'primary.dark' : 'text.primary',
                                        sx: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
                                    }}
                                />
                                <Typography variant="caption" sx={{ color: isChecked ? 'primary.main' : 'text.secondary', ml: 1, fontWeight: 500 }}>
                                    {item.frequency}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {hasMore && (
                <Button
                    fullWidth
                    size="small"
                    onClick={() => setIsExpanded(true)}
                    endIcon={<ExpandMoreIcon />}
                    sx={{ mt: 1, color: 'text.secondary', '&:hover': { color: 'primary.main', backgroundColor: 'transparent' } }}
                >
                    Show more
                </Button>
            )}
            {isExpanded && !search && (
                <Button
                    fullWidth
                    size="small"
                    onClick={() => setIsExpanded(false)}
                    endIcon={<ExpandLessIcon />}
                    sx={{ mt: 1, color: 'text.secondary', '&:hover': { color: 'primary.main', backgroundColor: 'transparent' } }}
                >
                    Show less
                </Button>
            )}
        </Box>
    );
};

export default FilterBlock;
