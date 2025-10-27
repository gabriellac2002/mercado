import { Group, Text } from "@mantine/core";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";

type UploadDropzoneProps = DropzoneProps;

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onDrop,
  ...props
}) => {
  return (
    <Dropzone
      onDrop={onDrop}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 1024 ** 2}
      accept={{
        "text/xml": [".xml"],
        "application/xml": [".xml"],
        "application/pdf": [".pdf"],
        "text/plain": [".txt"],
      }}
      {...props}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size={52}
            color="var(--mantine-color-green-6)"
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            size={52}
            color="var(--mantine-color-dimmed)"
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Clique para selecionar arquivos
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Anexe quantos arquivos desejar; cada arquivo não deve exceder 5 MB
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};
