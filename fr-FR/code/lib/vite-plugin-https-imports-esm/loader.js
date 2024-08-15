import axios from 'axios';
import inclusion from 'inclusion';
export function loader(matcher, options) {
    return async (id) => {
        if (matcher(id)) {
            const chalk = (await inclusion('chalk')).default;
            const ora = (await inclusion('ora')).default;
            const loading = ora({
                text: chalk.dim('downloading ') + chalk.hex('1450A3')(id),
                isSilent: options.silent
            }).start();
            try {
                const { data } = await axios.get(id);
                loading.succeed(chalk.dim('downloaded ') + chalk.hex('1450A3')(id));
                return data;
            }
            catch (error) {
                loading.fail(chalk.hex('C70039')('failed to download ') + chalk.hex('FF6969')(id));
                throw error;
            }
        }
    };
}
