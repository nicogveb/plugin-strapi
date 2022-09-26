const mutateLayout = layout => layout.map(row => {
    const mutatedRow = row.reduce((acc, field) => {
        const hasMapFieldEnabled = field.fieldSchema.pluginOptions?.['map-field'].enabled

        if (!hasMapFieldEnabled) {
            return [...acc, field]
        }
        return [...acc, { ...field, fieldSchema: { ...field.fieldSchema, type: 'map-field' } }]
    }, []);

    return mutatedRow;
})

const mutateEditViewHook = ({ layout, query }) => {
    const mutatedEditLayout = mutateLayout(layout.contentType.layouts.edit)
    const enhancedLayouts = {
        ...layout.contentType.layouts,
        edit: mutatedEditLayout
    }

    return {
        query,
        layout: {
            ...layout,
            contentType: {
                ...layout.contentType,
                layouts: enhancedLayouts,
            }
        }
    }
};

export default mutateEditViewHook;