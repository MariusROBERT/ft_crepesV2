import React from 'react';
import bg from "./images/bg_empty.png";
import {Anchor, BackgroundImage, Center, Container, Flex, MantineProvider, Text} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {MusicButton} from "./components/MusicButton";

interface Music {
  name: string;
  mp3: string;
}

function App() {
  const [nowPlaying, setNowPlaying] = React.useState("nothing");
  const [musicURL, setMusicURL] = React.useState("");

  const isLargeScreen = useMediaQuery('(min-width: 35em)');
  const isReallyLargeScreen = useMediaQuery('(min-width: 55em)');

  const musicList: Music[] = [
    {name: "Git you up", mp3: "./musics/Git_you_up.mp3"},
    {name: "CA42", mp3: "/musics/CA42.mp3"},
    {name: "Elle code bien sa mère", mp3: "./musics/Elle_code_bien_sa_mere.mp3"},
    {name: "ft_crepestyle", mp3: "src/musics/ft_crepestyle.mp3"},
    {name: "Tout niquer", mp3: "musics/Tout_niquer.mp3"}
  ]

  return (
      <MantineProvider withNormalizeCSS withGlobalStyles
                       theme={{
                         components: {
                           Text: {
                             sizes: {
                               xxl: (theme) => ({
                                 root: {
                                   fontSize: isLargeScreen ? "1.5rem" : theme.fontSizes.lg
                                 }
                               }),
                               xxxl: () => ({
                                 root: {
                                   fontSize: isLargeScreen ? (isReallyLargeScreen ? "10rem" : "6rem") : "3rem",
                                   color: "white",
                                   fontWeight: "bold",
                                   fontStyle: "italic"
                                 }
                               })
                             }
                           },
                           Button: {
                             sizes: {
                               xxl: (theme) => ({
                                 root: {
                                   fontSize: "1.5rem",
                                   padding: theme.spacing.xl
                                 }
                               })
                             }
                           }
                         }
                       }}
      >

        <Container p={0} m={0} miw={"100vw"} mih={"100vh"}>
          <BackgroundImage src={bg}>
            <Flex miw={"100vw"} mih={"100vh"} p={"sm"}
                  direction={"column"} align={"center"} justify={"space-evenly"}
            >
              <Center>
                <Text size={"xxxl"}>FT_CRÊPES</Text>
              </Center>

              <Flex direction={isLargeScreen ? "row" : "column"}
                    align={"center"} justify={"center"} wrap={"wrap"}
                    p={"md"}
              >
                {musicList.map((music) => (
                    <MusicButton name={music.name}
                                 mp3={music.mp3}
                                 onMusicTitle={setNowPlaying}
                                 onMusicURL={setMusicURL}
                    />
                ))}
              </Flex>

              <Flex direction={"column"} align={"center"} bg={"#99999999"} p={"md"} style={{borderRadius: "15px"}}>
                <Text size={"xxl"} color={"white"}>Now playing: {nowPlaying}</Text>
                <br/>
                <audio controls>
                  <source src={musicURL} type={"audio/mp3"}/>
                  <Text fz={"md"}>Your browser does not support the audio element. You can still download
                    it <Anchor href={musicURL} target={"_blank"}>here</Anchor></Text>
                </audio>
              </Flex>

            </Flex>
          </BackgroundImage>
        </Container>
      </MantineProvider>
  );
}

export default App;
