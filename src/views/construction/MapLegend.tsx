import React, { FC, Fragment, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import { Box, Typography } from '@mui/material';

const MapLegendChild = ({ nodes, checkedItems, onCheck, findItemChildren }: any) => {

    return (
        <List sx={{ p: 0 }}>
            {nodes.map((node: { id: React.Key | null | undefined; label: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; children: string | any[]; }) => {
                const labelId = `checkbox-list-label-${node.id}`;

                return (
                    <Box key={node.id}>
                        <FormControlLabel
                            control={
                                <Checkbox sx={{ py: 0, pl: 4, pr: 1 }}
                                    onChange={onCheck(node.id)}
                                    edge="start"
                                    checked={checkedItems.includes(node.id)}
                                    indeterminate={
                                        findItemChildren(node.id).some((childId: any) => checkedItems.includes(childId)) &&
                                        !checkedItems.includes(node.id)
                                    }
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            }
                            label={<Typography variant='overline' sx={{ fontWeight: 'bold', display: "flex", alignItems: 'center' }}>
                                <img src={`/images/icon/${node.id}.png`} alt="icon" width={20} />
                                <span>&nbsp;{node.label}</span></Typography>}
                        />
                        {node.children?.length > 0 && (
                            <MapLegendChild
                                nodes={node.children}
                                checkedItems={checkedItems}
                                onCheck={onCheck}
                                findItemChildren={findItemChildren}
                            />
                        )}
                    </Box>
                );
            })}
        </List>
    );
};

interface MapLegendProps {
    onChange: (data: any) => void;
}

const MapLegend: FC<MapLegendProps> = ({ onChange }) => {

    const consType = [
        {
            id: "nuocmat", label: "NƯỚC MẶT", children: [
                { label: "Thủy điện", id: "thuydien" },
                { label: "Hồ chứa", id: "hochua" },
                { label: "Trạm bơm", id: "trambom" },
                { label: "Trạm cấp nước", id: "tramcapnuoc" },
                { label: "Cống", id: "cong" },
                { label: "Nhà máy nước", id: "nhamaynuoc" }
            ]
        },
        {
            id: "nuocduoidat", label: "NƯỚC DƯỚI ĐẤT", children: [
                { label: "Khai thác", id: "khaithac" },
                { label: "Thăm dò", id: "thamdo" },
                { label: "Công trình khác", id: "congtrinh_nuocduoidatkhac" },
            ]
        },
        {
            id: "xathai", label: "XẢ THẢI", children: [
                { label: "Khu / Cụm CN", id: "khu_cumcn_taptrung" },
                { label: "SX tiểu thủ CN", id: "sx_tieuthu_cn" },
                { label: "Công trình khác", id: "congtrinh_xathaikhac" },
            ]
        }
    ];

    const initialItems = ['nuocmat', 'thuydien', 'hochua', 'trambom', 'tramcapnuoc', 'cong', 'nhamaynuoc', 'nuocduoidat', 'khaithac', 'thamdo', 'congtrinh_nuocduoidatkhac', 'xathai', 'khu_cumcn_taptrung', 'sx_tieuthu_cn', 'congtrinh_xathaikhac'];

    const [checkedItems, setCheckedItems] = useState(initialItems);

    const findItemChildren = (parentId: any) => {
        const parentItem = consType.find((item) => item.id === parentId);
        if (!parentItem) return [];

        const childrenIds: any = [];

        const traverseChildren = (item: any) => {
            if (item.children?.length === 0) return;
            item.children?.forEach((child: any) => {
                childrenIds.push(child.id);
                traverseChildren(child);
            });
        };

        traverseChildren(parentItem);

        return childrenIds;
    };

    const handleCheckboxChange = (item: string) => () => {
        setCheckedItems((prevCheckedItems: any) => {
            const currentIndex = prevCheckedItems.indexOf(item);
            let newChecked: string[] = [];

            if (currentIndex === -1) {
                newChecked = [...prevCheckedItems, item];
                const childrenIds = findItemChildren(item);
                newChecked.push(...childrenIds.filter((childId: any) => !prevCheckedItems.includes(childId))); // Only push unchecked children
            } else {
                newChecked = prevCheckedItems.filter((checkedId: any) => checkedId !== item);
                const childrenIds = findItemChildren(item);
                newChecked = newChecked.filter((checkedId) => !childrenIds.includes(checkedId));
            }

            return newChecked
        });
    };

    onChange(checkedItems);
    
    const renderTree = (nodes: any) => (
        <Fragment>
            {nodes.map((node: any) => {
                const labelId = `checkbox-list-label-${node.id}`;

                return (
                    <Box key={node.id} sx={{ display: "flex", flexDirection: "column", ml: 5 }}>
                        <FormControlLabel
                            control={
                                <Checkbox sx={{ pb: 1, pl: 2 }}
                                    onChange={handleCheckboxChange(node.id)}
                                    edge="start"
                                    checked={checkedItems.includes(node.id)}
                                    indeterminate={
                                        node.children.some((childId: any) => checkedItems.includes(childId)) &&
                                        !checkedItems.includes(node.id)
                                    }
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            }
                            label={<Typography variant='overline' sx={{ fontWeight: 'bold' }}>{node.label}</Typography>}
                        />
                        {node.children.length > 0 && (
                            <MapLegendChild
                                nodes={node.children}
                                checkedItems={checkedItems}
                                onCheck={handleCheckboxChange}
                                findItemChildren={findItemChildren}
                            />
                        )}
                    </Box>
                );
            })}
        </Fragment>
    );

    return <div>{renderTree(consType)}</div>;
};

export default MapLegend;
