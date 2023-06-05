export const changeLayout = () => {
    return {
        type: 'Change_Layout',
    };
};

export const labelsData = (label) => {
    return {
        type: 'Label_Data',
        payload: label,
    };
};