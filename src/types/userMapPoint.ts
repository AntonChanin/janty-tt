import { Color } from 'ol/color';
import { ColorLike } from 'ol/colorlike';

type UserMapPointProps = {
  coord: number[];
  color: Color | ColorLike | string;
  radius: number;
};

export type { UserMapPointProps }