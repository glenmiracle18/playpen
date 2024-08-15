import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function SharedFolders() {
  return (
    <div className="flex w-full flex-col min-h-screen bg-muted/40">
      <Header />

      <main className="flex-1 container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-4 md:p-6">
        <div className="bg-background rounded-lg p-4 md:p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Folder Details</h2>
            <div className="text-muted-foreground space-y-2">
              <p>
                <span className="font-medium">Total Files:</span> 24
              </p>
              <p>
                <span className="font-medium">Total Size:</span> 256 MB
              </p>
              <p>
                <span className="font-medium">Shared With:</span>
              </p>
              <ul className="space-y-1">
                <li>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt="User Avatar"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>John Doe</div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt="User Avatar"
                      />
                      <AvatarFallback>JA</AvatarFallback>
                    </Avatar>
                    <div>Jane Appleseed</div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt="User Avatar"
                      />
                      <AvatarFallback>BM</AvatarFallback>
                    </Avatar>
                    <div>Bob Marley</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg"
              alt="Shared Image"
              width={300}
              height={300}
              className="w-full aspect-square object-cover transition-all group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white font-medium">image-1.jpg</div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg"
              alt="Shared Image"
              width={300}
              height={300}
              className="w-full aspect-square object-cover transition-all group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white font-medium">image-2.jpg</div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg"
              alt="Shared Image"
              width={300}
              height={300}
              className="w-full aspect-square object-cover transition-all group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white font-medium">image-3.jpg</div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg"
              alt="Shared Image"
              width={300}
              height={300}
              className="w-full aspect-square object-cover transition-all group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white font-medium">image-4.jpg</div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg"
              alt="Shared Image"
              width={300}
              height={300}
              className="w-full aspect-square object-cover transition-all group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white font-medium">image-5.jpg</div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg"
              alt="Shared Image"
              width={300}
              height={300}
              className="w-full aspect-square object-cover transition-all group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white font-medium">image-6.jpg</div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg"
              alt="Shared Image"
              width={300}
              height={300}
              className="w-full aspect-square object-cover transition-all group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white font-medium">image-7.jpg</div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg"
              alt="Shared Image"
              width={300}
              height={300}
              className="w-full aspect-square object-cover transition-all group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white font-medium">image-8.jpg</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const Header = () => {
  return (
    <header className="bg-background border-b p-4 md:p-6">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Shared Folder</h1>
            <p className="text-muted-foreground">
              Explore the images shared with you in this folder.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
