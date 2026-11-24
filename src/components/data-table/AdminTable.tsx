import { Table, type TableProps } from 'antd';
import { useRouticTheme } from '../../theme/ThemeContext';

export interface AdminTableProps<T> extends TableProps<T> {
  overrideDensity?: 'small' | 'middle' | 'large';
}

export function AdminTable<T extends object>({
  overrideDensity,
  ...props
}: AdminTableProps<T>) {
  const { tableDensity } = useRouticTheme();

  return (
    <Table<T>
      size={overrideDensity || tableDensity}
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: ['10', '25', '50', '100'],
        defaultPageSize: 10,
        ...props.pagination,
      }}
      {...props}
    />
  );
}
