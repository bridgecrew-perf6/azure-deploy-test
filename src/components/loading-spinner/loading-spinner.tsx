import { FC } from 'react';

import css from './loading-spinner.module.css'

export const LoadingSpinner: FC = (): JSX.Element => {
    return (
        <div className={css.spinnerContainer}>
            <div className={css.loadingSpinner}>
            </div>
        </div>
    )
}