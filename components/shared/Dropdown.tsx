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
};

const Dropdown = ({ value, onChangeHandler, categories }: DropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} required>
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
