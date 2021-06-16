def subdict(file):
    with open('output.txt', 'r') as f:
        subs = f.read()
    subs = subs.split('\n\n')
    subdict = {}
    for sub in subs:
        sub = sub.split('\n')
        subdict[sub[0]] = {'time': sub[1],
                           'starttime': starttime(sub[1]), 'subtitle': sub[2]}
    return subdict


def starttime(timestring):
    t = timestring.split(',')[0].split(':')
    return int(t[0]) * 60 * 60 + int(t[1]) * 60 + int(t[2])

# class Subtitle:
#     def __init__(self, subs):
#         self.subs =
#         return


if __name__ == "__main__":
    print(subdict('output.txt'))
