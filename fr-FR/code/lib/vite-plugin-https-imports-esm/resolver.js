export function resolver(matcher) {
    return (id, importer) => {
        if (matcher(id)) {
            return id;
        }
        else if (matcher(importer)) {
            return new URL(id, importer).toString();
        }
        return undefined;
    };
}
