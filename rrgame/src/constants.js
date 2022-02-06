export const POSSIBLE_TARGET_TYPES = ['saturn', 'navigator', 'triangle_star'];
export const POSSIBLE_TARGET_COLORS = ['yellow', 'blue', 'red', 'green'];
export const POSSIBLE_ROBOTS = ['yellow', 'blue', 'red', 'green'];
export const POSSIBLE_TARGETS = POSSIBLE_TARGET_TYPES.flatMap(type => POSSIBLE_TARGET_COLORS.map(color => ({type: type, color: color})));
    
