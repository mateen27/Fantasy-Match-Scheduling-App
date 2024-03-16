import React from 'react';
import { Box } from 'native-base';

const Cards = () => {
  return (
    <Box mx={2} width="100">
      <Box
        alignSelf="center"
        _text={{
          fontSize: "md",
          fontWeight: "medium",
          width: "100%",
          color: "warmGray.50",
          letterSpacing: "lg"
        }}
        bg={["red.400", "blue.400"]}
      >
        This is a Box
      </Box>
    </Box>
  );
}

export default Cards;
