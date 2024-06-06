import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryEnum } from "@/constants";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  categories: typeof categoryEnum.Enum;
  defaultValue?: string;
  update?: boolean
};

const Dropdown = ({ value, onChangeHandler, categories, defaultValue, update }: DropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} required defaultValue={update ? defaultValue : undefined}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Type of Problem" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(categories).map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
