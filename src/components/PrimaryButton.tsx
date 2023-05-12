import { Button } from "native-base";
import React from "react";

export const PrimaryButton = (props: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      variant={"rounded"}
      _text={{
        // style: {
        //   fontSize: 33,
        // },
        fontSize: "lg",
        fontWeight: "medium",
        color: "black",
      }}
      {...props}
    />
  );
};
