import type { DepartmentId } from '../../i18n/messages/shared'
import type { PageProps } from '../types'
import { DepartmentDetail } from './departments/DepartmentDetail'
import { DepartmentsOverview } from './departments/DepartmentsOverview'
import './departments/departments.css'

/**
 * `/solutions/departments` (overview with department tabs) and
 * `/solutions/departments/<id>` (one department, sets its own metadata).
 */
export function DepartmentsPage({
  locale,
  departmentId,
  pathname,
}: PageProps & { departmentId: DepartmentId | null; pathname: string }) {
  return departmentId ? (
    <DepartmentDetail key={departmentId} locale={locale} id={departmentId} pathname={pathname} />
  ) : (
    <DepartmentsOverview locale={locale} />
  )
}
