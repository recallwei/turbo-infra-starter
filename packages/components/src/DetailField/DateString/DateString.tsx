import './DateString.scss'

import type { CommonTimeFormatter, LocalTimeFormatter } from '@infra/utils'
import { TimeUtils } from '@infra/utils'
import { Skeleton, Tooltip } from 'antd'
import { isNil } from 'lodash-es'
import { memo } from 'react'

export interface DateStringProps {
  /**
   * Display date string
   */
  value?: string
  /**
   * The color of text
   */
  textColor?: string
  /**
   * The short date formatter of time
   */
  shortDateFormatter?: CommonTimeFormatter | LocalTimeFormatter
  /**
   * The long date formatter of time
\   */
  longDateFormatter?: CommonTimeFormatter | LocalTimeFormatter
}

export const DateString = memo<DateStringProps>(
  ({
    value,
    textColor,
    shortDateFormatter = 'MM-DD HH:mm',
    longDateFormatter = 'YYYY-MM-DD HH:mm:ss'
  }) => {
    let label
    let fullLabel
    if (!isNil(value)) {
      fullLabel = TimeUtils.formatTime(value, longDateFormatter)
      label = TimeUtils.isCurrentYear(value)
        ? TimeUtils.formatTime(value, shortDateFormatter)
        : fullLabel
    }

    return (
      <Skeleton
        loading={isNil(label)}
        paragraph={{ rows: 1 }}
      >
        <Tooltip
          className={['date-string--tooltip'].join(' ')}
          title={fullLabel}
        >
          <span style={{ color: textColor }}>{label}</span>
        </Tooltip>
      </Skeleton>
    )
  }
)
